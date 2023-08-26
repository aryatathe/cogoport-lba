class LikesjunctionSerializerSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :user_details
  def user_details
    ActiveModelSerializers::SerializableResource.new(object.user, each_serializer: BasicUserDetailsSerializerSerializer).as_json
  end
end
