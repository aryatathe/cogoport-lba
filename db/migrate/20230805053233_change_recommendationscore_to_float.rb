class ChangeRecommendationscoreToFloat < ActiveRecord::Migration[7.0]
  def change
    change_column :topicrecommendations, :recommendation_score, :float
  end
end
