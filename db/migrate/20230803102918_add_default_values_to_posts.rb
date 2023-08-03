class AddDefaultValuesToPosts < ActiveRecord::Migration[7.0]
  def change
    change_column_default :posts, :comments_count, 0
    change_column_default :posts, :likes_count, 0
    change_column_default :posts, :views_count, 0
    change_column_default :posts, :popularity_metric, 0
  end
end
