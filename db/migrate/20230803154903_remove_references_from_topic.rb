class RemoveReferencesFromTopic < ActiveRecord::Migration[7.0]
  def change
    remove_reference :topics, :user, foreign_key: true
    remove_reference :topics, :post, foreign_key: true
  end
end
