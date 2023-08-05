class ChangeDataTypeInReadingtime < ActiveRecord::Migration[7.0]
  def change
    change_column :readingtimes, :postID, :integer
  end
end
