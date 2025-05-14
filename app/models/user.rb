class User < ApplicationRecord
has_secure_password

has_many :sessions, dependent: :destroy
has_many :expenses
has_many :expenses
has_one :budget

validates :name, presence: true
validates :email, presence: true, uniqueness: true
validates :password, length: { minimum: 6 }
validates :password_confirmation, presence: true
end
