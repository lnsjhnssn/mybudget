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
    length: { minimum: 9, message: "Password must be at least 9 characters long" }

  def self.min_password_length
    validators_on(:password).find { |v| v.is_a?(ActiveModel::Validations::LengthValidator) }&.options[:minimum] || 9
  end
end

