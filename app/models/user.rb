class User < ApplicationRecord
has_secure_password

has_many :sessions, dependent: :destroy
has_many :expenses
has_many :categories
has_many :goals

validates :name, presence: true
validates :email, presence: true, uniqueness: true
validates :password, length: { minimum: 6 }
validates :password_confirmation, presence: true
end
