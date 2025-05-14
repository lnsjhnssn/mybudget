class CreateBudgets < ActiveRecord::Migration[8.0]
  def change
    create_table :budgets do |t|
      t.references :user, null: false, foreign_key: true
      t.date :month
      t.decimal :amount

      t.timestamps
    end
  end
end
