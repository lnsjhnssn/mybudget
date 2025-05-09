# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    render inertia: 'Home', props: {
      authenticated: current_user.present?
    }
  end
end
