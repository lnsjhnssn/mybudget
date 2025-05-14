class Expense < ApplicationRecord
  belongs_to :user
  has_many :expense_tags
  has_many :tags, through: :expense_tags
end
