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
  has_many :readingtimes, dependent: :destroy, class_name: 'Readingtime'
  has_many :drafts, dependent: :destroy, class_name: 'Draft'
  has_many :savelaters, dependent: :destroy, class_name: 'Savelater'
  has_many :lists, dependent: :destroy, class_name: 'List'
  has_many :follower_relationships, class_name: 'Follower', foreign_key: 'to_id', dependent: :destroy
  has_many :followers, through: :follower_relationships, source: :follower

  has_many :following_relationships, class_name: 'Follower', foreign_key: 'from_id', dependent: :destroy
  has_many :following, through: :following_relationships, source: :following

  def followers
    super || []
  end

  def following
    super || []
  end
end