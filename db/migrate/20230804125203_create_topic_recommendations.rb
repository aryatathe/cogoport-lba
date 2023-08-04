class CreateTopicRecommendations < ActiveRecord::Migration[7.0]
  def change
    create_table :topic_recommendations do |t|
      t.string :name
      t.integer :recommendation_score
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
