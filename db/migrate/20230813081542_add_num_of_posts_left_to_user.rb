class AddNumOfPostsLeftToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :num_of_posts_left, :integer, default: 5
  end
end
