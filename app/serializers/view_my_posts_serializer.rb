class ViewMyPostsSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :comments_count, :likes_count, :views_count, :published, :user_details
  has_many :topics
  def user_details
    ActiveModelSerializers::SerializableResource.new(object.user, each_serializer: BasicUserDetailsSerializerSerializer).as_json
  end
end
