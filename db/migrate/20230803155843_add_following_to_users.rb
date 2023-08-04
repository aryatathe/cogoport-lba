class AddFollowingToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :following, foreign_key: { to_table: :users }
  end
end
