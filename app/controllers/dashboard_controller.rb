class DashboardController < ApplicationController
  before_action :require_login

  def index
    render inertia: 'Dashboard', props: {
      user: {
        id: current_user.id,
        email: current_user.email,
        name: current_user.name
      }
    }
  end
end
