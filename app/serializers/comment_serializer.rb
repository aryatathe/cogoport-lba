class CommentSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :description, :user_Detils
  def user_Detils
    ActiveModelSerializers::SerializableResource.new(object.user, each_serializer: BasicUserDetailsSerializerSerializer).as_json
  end
end
