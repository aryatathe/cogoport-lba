class CreatePost < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :featured_image
      t.string :content
      t.integer :comments_count
      t.integer :likes_count
      t.integer :views_count
      t.integer :popularity_metric
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
