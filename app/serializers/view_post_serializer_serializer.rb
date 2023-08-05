class ViewPostSerializerSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :comments_count, :likes_count, :views_count, :content
  has_many :topics
  has_many :comments
  has_many :likesjunctions, serializer: LikesjunctionSerializerSerializer
end
