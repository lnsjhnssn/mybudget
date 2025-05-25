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

      redirect_to '/expenses/add'
    else
      Rails.logger.error "User creation failed: #{@user.errors.full_messages.join(', ')}"
      render inertia: 'Home', props: {
        errors: {
          user: {
            email: @user.errors[:email].first,
            password: @user.errors[:password].first,
            password_confirmation: @user.errors[:password_confirmation].first
          }
        }
      }, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: { 
        message: 'User updated successfully',
        user: {
          id: @user.id,
          email: @user.email
        }
      }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
