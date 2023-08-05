class User < ApplicationRecord
    has_secure_password
    has_one_attached :profile_pic
    has_many(
    :posts,
    dependent: :destroy
  )
  has_many :comments, dependent: :destroy, class_name: 'Comment'
  has_many :likesjunctions, dependent: :destroy, class_name: 'Likesjunction'
  has_many :topicrecommendations, dependent: :destroy, class_name: 'Topicrecommendation'
  belongs_to :following, class_name: "User", optional: true
  has_many :followers, foreign_key: "following_id", class_name: "User"
  has_many :readingtimes, dependent: :destroy, class_name: 'Readingtime'
  has_many :drafts, dependent: :destroy, class_name: 'Draft'
  has_many :savelaters, dependent: :destroy, class_name: 'Savelater'
  has_many :lists, dependent: :destroy, class_name: 'List'

  # Helper method to follow another user
  def follow(user)
    user.followers << self
  end

  # Helper method to unfollow a user
  def unfollow(user)
    user.followers.delete(self)
  end
end