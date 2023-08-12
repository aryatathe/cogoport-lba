class RemoveIndexFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_index :users, column: :following_id
  end
end
