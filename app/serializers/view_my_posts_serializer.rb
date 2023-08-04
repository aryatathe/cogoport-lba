class ViewMyPostsSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :comments_count, :likes_count, :views_count, :user_Detils
  has_many :topics
  def user_Detils
    ActiveModelSerializers::SerializableResource.new(object.user, each_serializer: BasicUserDetailsSerializerSerializer).as_json
  end
end
