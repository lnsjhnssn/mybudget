class CreateExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :expenses do |t|
      t.references :user, null: false, foreign_key: true
      t.string :place
      t.date :date
      t.decimal :amount

      t.timestamps
    end
  end
end
