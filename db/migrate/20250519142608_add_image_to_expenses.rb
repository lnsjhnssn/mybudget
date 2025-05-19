class AddImageToExpenses < ActiveRecord::Migration[8.0]
  def change
    add_column :expenses, :image, :string
  end
end
