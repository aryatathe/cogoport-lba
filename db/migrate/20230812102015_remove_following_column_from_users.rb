class RemoveFollowingColumnFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :following_id, :integer
  end
end
