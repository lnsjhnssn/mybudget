# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    if current_user.present?
      redirect_to '/expenses/add'
      return
    end

    render inertia: 'Home', props: {
      authenticated: false,
      minPasswordLength: User.min_password_length
    }
  end
end
