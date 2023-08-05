class AddIndexesToTablesForBetterSearchOptimization < ActiveRecord::Migration[7.0]
  def change
    add_index :posts, :title
    add_index :topics, :name
  end
end
