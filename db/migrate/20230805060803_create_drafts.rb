class CreateDrafts < ActiveRecord::Migration[7.0]
  def change
    create_table :drafts do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :postID
      t.timestamps
    end
    add_index :drafts, :postID
  end
end
