class RemoveColumnNameFromPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :num_of_posts_left, :integer
  end
end
