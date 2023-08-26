class CreateUser < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username, index: { unique: true, name: 'unique_usernames' }
      t.string :email, index: { unique: true, name: 'unique_emails' }
      t.string :password
      t.text :about
      t.string :profile_pic
      t.string :pfp
      t.integer :followers_count
      t.integer :following_count
      t.boolean :is_author
      t.string :token, index: {unique: true}
      t.timestamps
    end
  end
end
