class CreateListsharedaccess < ActiveRecord::Migration[7.0]
  def change
    create_table :listsharedaccesses do |t|
      t.string :userID
      t.references :lists, null: false, foreign_key: true
      t.timestamps
    end
  end
end
