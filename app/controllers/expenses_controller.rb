class ExpensesController < ApplicationController
  def index
    expenses = current_user.expenses.includes(:tags)
    
    # Get current month's budget
    current_month = Date.today.beginning_of_month
    budget = current_user.budgets.find_by(month: current_month)
    
    # Apply date filter if present, default to this_month
    date_filter = params[:date_filter] || 'this_month'
    expenses = filter_by_date(expenses, date_filter)

    render inertia: 'Expenses/ViewExpenses', props: {
      expenses: expenses.order(date: :desc).as_json(include: :tags),
      budget: budget&.as_json(only: [:id, :amount, :month]).tap do |json|
        json['amount'] = json['amount'].to_f if json
      end,
      dateFilter: date_filter,
      user: {
        id: current_user.id,
        email: current_user.email,
        name: current_user.name
      }
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
    if expense.update(expense_params)
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
    params.require(:expense).permit(:place, :date, :amount)
  end

  def filter_by_date(expenses, filter)
    case filter
    when 'today'
      expenses.where(date: Date.today)
    when 'this_month'
      expenses.where(date: Date.today.beginning_of_month..Date.today.end_of_month)
    when 'last_30_days'
      expenses.where(date: 30.days.ago..Date.today)
    when 'last_month'
      expenses.where(date: 1.month.ago.beginning_of_month..1.month.ago.end_of_month)
    when 'last_3_months'
      expenses.where(date: 3.months.ago..Date.today)
    when 'last_6_months'
      expenses.where(date: 6.months.ago..Date.today)
    when 'this_year'
      expenses.where(date: Date.today.beginning_of_year..Date.today)
    else
      expenses
    end
  end

  def assign_tags(expense)
    if params[:tags].present?
      tags = params[:tags].split(',').map(&:strip)
      tags.each do |tag_name|
        tag = Tag.find_or_create_by(name: tag_name)
        expense.tags << tag unless expense.tags.include?(tag)
      end
    end
  end
end