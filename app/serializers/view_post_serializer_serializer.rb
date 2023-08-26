class ViewPostSerializerSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :comments_count, :likes_count, :views_count, :content, :published, :user_details
  has_many :topics
  has_many :comments
  has_many :likesjunctions, serializer: LikesjunctionSerializerSerializer
  def user_details
    ActiveModelSerializers::SerializableResource.new(object.user, each_serializer: BasicUserDetailsSerializerSerializer).as_json
  end
end
