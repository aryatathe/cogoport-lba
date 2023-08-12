class CreateRevisionhistory < ActiveRecord::Migration[7.0]
  def change
    create_table :revisionhistories do |t|
      t.integer :version
      t.string :title
      t.string :content
      t.string :featured_image
      t.references :posts, null: false, foreign_key: true
      t.timestamps
    end
  end
end
