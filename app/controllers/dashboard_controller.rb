class DashboardController < ApplicationController
  before_action :require_login

  def index
    redirect_to expenses_add_path
  end
end
