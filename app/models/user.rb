class User < ApplicationRecord
    has_one_attached :profile_pic
    has_many(
    :posts,
    dependent: :destroy
  )
  has_many :comments, dependent: :destroy
  has_many :likesjunctions, dependent: :destroy
  belongs_to :following, class_name: "User", optional: true
  has_many :followers, foreign_key: "following_id", class_name: "User"
end