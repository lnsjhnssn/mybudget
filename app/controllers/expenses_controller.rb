class ExpensesController < ApplicationController
  before_action :require_login

  def index
    expenses = current_user.expenses.includes(:tags).order(date: :desc)
    render inertia: 'Expenses/ViewExpenses', props: {
      expenses: expenses.as_json(include: :tags),
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
    tag_names = Array(params[:tags])
    tags = tag_names.map { |name| Tag.find_or_create_by(name:) }
    expense.tags = tags
  end
end