class Expense < ApplicationRecord
  belongs_to :user
  has_many :expense_tags, dependent: :destroy
  has_many :tags, through: :expense_tags
end
