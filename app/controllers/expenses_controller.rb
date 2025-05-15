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
    render inertia: 'Expenses/AddExpense', props: {
      user: {
        id: current_user.id,
        email: current_user.email,
        name: current_user.name
      }
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

  private

  def expense_params
    params.require(:expense).permit(:place, :date, :amount)
  end

  def assign_tags(expense)
    # Split the tags string by comma and trim whitespace
    tag_names = params[:tags].to_s.split(',').map(&:strip).reject(&:empty?)
    # Create or find tags and associate them with the expense
    tags = tag_names.map { |name| Tag.find_or_create_by(name:) }
    expense.tags = tags
  end

  def filter_by_date(expenses, filter_type)
    case filter_type
    when 'today'
      # Show only today's expenses
      expenses.where(date: Date.today)
    when 'this_month'
      # Show expenses from the 1st of current month until today
      expenses.where(date: Date.today.beginning_of_month..Date.today)
    when 'last_30_days'
      # Show expenses from exactly 30 days ago until today
      expenses.where('date >= ?', 30.days.ago)
    when 'last_month'
      # Show expenses from the previous month
      last_month = Date.today.last_month
      expenses.where(date: last_month.beginning_of_month..last_month.end_of_month)
    when 'last_3_months'
      # Show expenses from 3 months ago until today
      expenses.where('date >= ?', 3.months.ago)
    when 'last_6_months'
      # Show expenses from 6 months ago until today
      expenses.where('date >= ?', 6.months.ago)
    when 'this_year'
      # Show expenses from January 1st until today
      expenses.where('date >= ?', Date.today.beginning_of_year)
    else
      # Show all expenses
      expenses
    end
  end
end