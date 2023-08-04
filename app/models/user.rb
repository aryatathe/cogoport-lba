class User < ApplicationRecord
    has_secure_password
    has_one_attached :profile_pic
    has_many(
    :posts,
    dependent: :destroy
  )
  has_many :topic_recommendations, dependent: :destroy, class_name: 'Topic_recommendation'
  has_many :comments, dependent: :destroy, class_name: 'Comment'
  has_many :likesjunctions, dependent: :destroy, class_name: 'Likesjunction'
  belongs_to :following, class_name: "User", optional: true
  has_many :followers, foreign_key: "following_id", class_name: "User"
end