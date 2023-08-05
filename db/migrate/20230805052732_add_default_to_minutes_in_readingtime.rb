class AddDefaultToMinutesInReadingtime < ActiveRecord::Migration[7.0]
  def change
    change_column_default :readingtimes, :minutes, 0
  end
end
