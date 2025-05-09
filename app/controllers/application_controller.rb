# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    token = cookies.signed[:expense_tracker_session_token]
    return nil if token.blank?

    session = Session.find_by(token: token)
    return nil if session.nil?

    session.user
  end


  def require_login
    unless current_user
      respond_to do |format|
        format.html { redirect_to '/', inertia: true }
        format.json { render json: { error: 'Unauthorized' }, status: :unauthorized }
      end
    end
  end


end
