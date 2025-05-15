class BudgetsController < ApplicationController
  before_action :require_login

  def show
    current_month = Date.today.beginning_of_month
    budget = current_user.budgets.find_by(month: current_month)
    
    # If no budget exists for current month, create one based on previous month
    if budget.nil?
      previous_month = current_month.last_month
      previous_budget = current_user.budgets.find_by(month: previous_month)
      
      if previous_budget
        budget = current_user.budgets.create!(
          month: current_month,
          amount: previous_budget.amount
        )
      end
    end
    
    render inertia: 'Budget/Index', props: {
      budget: budget&.as_json(only: [:id, :amount, :month]).tap do |json|
        json['amount'] = json['amount'].to_f if json
      end,
      user: {
        id: current_user.id,
        email: current_user.email,
        name: current_user.name
      }
    }
  end

  def create
    current_month = Date.today.beginning_of_month
    budget = current_user.budgets.build(month: current_month)
    
    if budget.update(budget_params)
      redirect_to '/budget', notice: 'Budget set successfully'
    else
      redirect_to '/budget', errors: budget.errors.full_messages
    end
  end

  def update
    budget = current_user.budgets.find(params[:id])
    
    if budget.update(budget_params)
      redirect_to '/budget', notice: 'Budget updated successfully'
    else
      redirect_to '/budget', errors: budget.errors.full_messages
    end
  end

  private

  def budget_params
    params.require(:budget).permit(:amount)
  end
end
