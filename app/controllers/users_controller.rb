class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      session = @user.sessions.create
      cookies.permanent.signed[:expense_tracker_session_token] = {
        value: session.token,
        httponly: true,
        secure: Rails.env.production?
      }

      redirect_to '/dashboard'
    else
      Rails.logger.error "User creation failed: #{@user.errors.full_messages.join(', ')}"
      render inertia: 'Home', props: {
        errors: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
