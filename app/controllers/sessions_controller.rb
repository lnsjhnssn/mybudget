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
      render inertia: 'Login', props: {
        errors: ['Invalid email or password']
      }, status: :unprocessable_entity
    end
  end

  def destroy
    token = cookies.signed[:expense_tracker_session_token]
    session = Session.find_by(token: token)

    if session
      session.destroy
    end

    cookies.delete(:expense_tracker_session_token)
    redirect_to '/'
  end

  def authenticated
    token = cookies.signed[:expense_tracker_session_token]
    session = Session.find_by(token: token)

    if session
      render json: {
        authenticated: true,
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name
        }
      }
    else
      render json: { authenticated: false }, status: :unauthorized
    end
  end
end
