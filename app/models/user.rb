class User < ApplicationRecord
  has_secure_password

  has_many :sessions, dependent: :destroy
  has_many :expenses
  has_many :budgets

  # Email validation
  validates :email, 
    presence: true, 
    uniqueness: { message: "This email has already been taken" },
    format: { 
      with: /\A[^@\s]+@[^@\s]+\.[^@\s]+\z/,
      message: "Please enter a valid email address"
    }

  # Password validation
  validates :password, 
    length: { minimum: 6, message: "Password must be at least 6 characters long" },
    format: { 
      with: /\A(?=.*[0-9])(?=.*[!@#$%^&*+_])[a-zA-Z0-9!@#$%^&*+_]+\z/,
      message: "Password must contain at least one number, one special character (!@#$%^&*+_), one lowercase letter and one uppercase letter"
    }
  validates :password_confirmation, presence: true
  
  validate :password_confirmation_matches

  private

  def password_confirmation_matches
    if password_confirmation.present? && password != password_confirmation
      errors.delete(:password_confirmation) # Remove the default message
      errors.add(:password_confirmation, "Password doesn't match")
    end
  end
end

