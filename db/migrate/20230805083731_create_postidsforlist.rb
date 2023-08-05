class CreatePostidsforlist < ActiveRecord::Migration[7.0]
  def change
    create_table :postidsforlists do |t|
      t.string :PostID
      t.references :lists, null: false, foreign_key: true
      t.timestamps
    end
  end
end
