class BudgetsController < ApplicationController
  before_action :require_login

  def show
    budget = current_user.budget || current_user.build_budget(month: Date.today.beginning_of_month, amount: 0)
    render inertia: 'Budget/Index', props: { budget: budget }
  end


  def create
    budget = current_user.build_budget(budget_params)
    if budget.save
      redirect_to budget_path, notice: 'Budget set'
    else
      redirect_to budget_path, errors: budget.errors.full_messages
    end
  end

  def update
    budget = current_user.budget
    if budget.update(budget_params)
      redirect_to budget_path, notice: 'Budget updated'
    else
      redirect_to budget_path, errors: budget.errors.full_messages
    end
  end

  private

  def budget_params
    params.require(:budget).permit(:month, :amount)
  end
end
