class RemoveUniqueIndexFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_index :users, :username, name: "unique_usernames"
  end
end
