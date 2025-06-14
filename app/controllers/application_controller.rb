# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    @current_user ||= begin
      token = cookies.signed[:expense_tracker_session_token]
      Rails.logger.info "Cookie token: #{token}"
      
      return nil if token.blank?

      session = Session.find_by(token: token)
      Rails.logger.info "Found session: #{session.inspect}"
      
      return nil if session.nil?

      session.user
    end
  end


  def require_login
    unless current_user
      respond_to do |format|
        format.html { redirect_to '/' }
        format.json { render json: { error: 'Unauthorized' }, status: :unauthorized }
      end
    end
  end


end
