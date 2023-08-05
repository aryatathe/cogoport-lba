class CreateReadingtime < ActiveRecord::Migration[7.0]
  def change
    create_table :readingtimes do |t|
      t.integer :minutes
      t.references :user, null: false, foreign_key: true
      t.string :postID
      t.timestamps
    end
    add_index :readingtimes, :postID
  end
end
