class AddNumOfPostsLeftToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :num_of_posts_left, :integer, default: 5
  end
end
