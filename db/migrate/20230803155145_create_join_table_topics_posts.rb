class CreateJoinTableTopicsPosts < ActiveRecord::Migration[7.0]
  def change
    create_join_table :topics, :posts do |t|
      # t.index [:topic_id, :post_id]
      # t.index [:post_id, :topic_id]
    end
  end
end
