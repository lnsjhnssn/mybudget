# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    render inertia: 'Home', props: {
      authenticated: current_user.present?,
      minPasswordLength: User.min_password_length
    }
  end
end
