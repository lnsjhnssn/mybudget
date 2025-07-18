class ExpensesController < ApplicationController
  before_action :require_login

  def index
    expenses = current_user.expenses.includes(:tags)
    
    # Get current month's budget
    current_month = Date.today.beginning_of_month
    budget = current_user.budgets.find_by(month: current_month)
    
    # Apply date filter if present, default to this_month
    date_filter = params[:date_filter] || 'this_month'
    expenses = filter_by_date(expenses, date_filter)

    # Get unique places and tags from user's expenses
    places = current_user.expenses.distinct.pluck(:place).compact
    tags = current_user.expenses.joins(:tags).distinct.pluck('tags.name').compact

    render inertia: 'Expenses/ViewExpenses', props: {
      expenses: expenses.order(date: :desc).as_json(
        only: [:id, :place, :date, :amount, :created_at, :updated_at],
        include: { tags: { only: [:id, :name] } },
        methods: :image_url
      ),
      budget: budget&.as_json(only: [:id, :amount, :month]).tap do |json|
        json['amount'] = json['amount'].to_f if json
      end,
      dateFilter: date_filter,
      user: {
        id: current_user.id,
        email: current_user.email,
        name: current_user.name
      },
      existingPlaces: places,
      existingTags: tags
    }
  end

  def new
    # Get unique places and tags from user's expenses
    places = current_user.expenses.distinct.pluck(:place).compact
    tags = current_user.expenses.joins(:tags).distinct.pluck('tags.name').compact

    render inertia: 'Expenses/AddExpense', props: {
      user: {
        id: current_user.id,
        email: current_user.email,
        name: current_user.name
      },
      existingPlaces: places,
      existingTags: tags
    }
  end

  def create
    # Set default values before normalization and creation
    params[:place] = "Unknown Place" if params[:place].blank?
    params[:amount] = 0 if params[:amount].blank? || !params[:amount].to_s.match?(/\A[+-]?\d*(\.\d+)?\z/)

    # Handle tags default
    # Tags might come as an array from the frontend default logic, or a string, or be absent
    tags_param = params[:tags]
    if tags_param.blank? || (tags_param.is_a?(Array) && tags_param.reject(&:blank?).empty?)
      params[:tags] = ["Other"]
    elsif tags_param.is_a?(Array)
      # Ensure all elements are strings and filter out blanks again in case of ["", "Food"]
      params[:tags] = tags_param.map(&:to_s).reject(&:blank?)
      params[:tags] = ["Other"] if params[:tags].empty? # If filtering results in empty, default to Other
    elsif tags_param.is_a?(String) && tags_param.strip.split(',').map(&:strip).reject(&:blank?).empty?
      # Handles cases like ", , " or just "" for string input
      params[:tags] = ["Other"]
    end

    # Normalize place and tags before create
    # The existing normalization logic for place will apply to "Unknown Place" if it was set.
    params[:place] = normalize_text(params[:place])

    # Handle tags whether they come as a string or array, now ensuring params[:tags] is an array
    current_tags = params[:tags] # Can be nil if not provided and not defaulted above
    
    if current_tags.present?
      # Ensure current_tags is an array if it's a single string (e.g., from direct form submission not hitting frontend JS)
      tags_to_normalize = current_tags.is_a?(Array) ? current_tags : current_tags.split(',').map(&:strip)
      params[:tags] = tags_to_normalize.map { |tag| normalize_text(tag) }.reject(&:blank?)
      # If after normalization, tags array is empty (e.g., was [" "]), default to Other
      params[:tags] = ["Other"] if params[:tags].empty?
    else
      # If current_tags was nil or became empty and wasn't caught by initial defaulting
      params[:tags] = ["Other"] 
    end

    expense = current_user.expenses.new(expense_params)
    if expense.save
      assign_tags(expense)
      redirect_to expenses_path, notice: 'Expense added'
    else
      redirect_to expenses_path, errors: expense.errors.full_messages
    end
  end

  def update
    expense = current_user.expenses.find(params[:id])
    Rails.logger.info "Update params: #{params.inspect}"
    
    # Normalize place and tags before update
    if params[:place].present?
      params[:place] = normalize_text(params[:place])
    end

    if params[:tags].present?
      processed_tags = if params[:tags].is_a?(Array)
                         params[:tags]
                       elsif params[:tags].is_a?(ActionController::Parameters) || params[:tags].is_a?(Hash)
                         params[:tags].values
                       else
                         [params[:tags].to_s]
                       end
      # Normalize each tag name and remove any blank tags that might result
      params[:tags] = processed_tags.map { |tag_name| normalize_text(tag_name.to_s) }.reject(&:blank?)
    end
    
    if expense.update(expense_params)
      Rails.logger.info "Tags params: #{params[:tags].inspect}"
      assign_tags(expense)
      redirect_to expenses_path, notice: 'Expense updated successfully'
    else
      redirect_to expenses_path, errors: expense.errors.full_messages
    end
  end

  def destroy
    expense = current_user.expenses.find_by(id: params[:id])
    if expense
      expense.destroy
      redirect_to expenses_path, notice: 'Expense deleted successfully'
    else
      redirect_to expenses_path, alert: 'Expense not found'
    end
  end

  private

  def expense_params
    params.permit(:place, :date, :amount, :image)
  end

  def filter_by_date(expenses, filter)
    case filter
    when 'today'
      expenses.where(date: Date.today)
    when 'this_month'
      expenses.where(date: Date.today.beginning_of_month..Date.today.end_of_month)
    when 'last_month'
      expenses.where(date: 1.month.ago.beginning_of_month..1.month.ago.end_of_month)
    when 'last_3_months'
      expenses.where(date: 3.months.ago..Date.today)
    when 'last_6_months'
      expenses.where(date: 6.months.ago..Date.today)
    else
      expenses
    end
  end

  def assign_tags(expense)
    Rails.logger.info "Assigning tags: #{params[:tags].inspect}"
    if params[:tags].present?
      # Clear existing tags
      expense.tags.clear
      
      # Add new tags
      tags = params[:tags].is_a?(Array) ? params[:tags] : [params[:tags]]
      tags.each do |tag_name|
        tag = Tag.find_or_create_by(name: tag_name)
        expense.tags << tag
      end
    end
  end

  def normalize_text(text)
    return text if text.blank?
    text.strip.split.map(&:capitalize).join(' ')
  end
end