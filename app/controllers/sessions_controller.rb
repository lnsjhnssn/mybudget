class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:user][:email])

    if user&.authenticate(params[:user][:password])
      session = user.sessions.create
      cookies.permanent.signed[:expense_tracker_session_token] = {
        value: session.token,
        httponly: true,
        secure: Rails.env.production?
      }

      redirect_to '/dashboard'
    else
      render inertia: 'Home', props: {
        errors: ['Invalid email or password']
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if current_user
      current_user.sessions.destroy_all
      cookies.delete(:expense_tracker_session_token)
    end
    
    redirect_to '/', notice: 'Logged out successfully'
  end

  def authenticated
    render json: { authenticated: current_user.present? }
  end
end
