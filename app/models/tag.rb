class Tag < ApplicationRecord
  has_many :expense_tags
has_many :expenses, through: :expense_tags
end
