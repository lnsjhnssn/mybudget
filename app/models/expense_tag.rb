class ExpenseTag < ApplicationRecord
  belongs_to :expense
  belongs_to :tag
end
