class PostidforlistSerializer < ActiveModel::Serializer
  attributes :postDetails
  def postDetails
    post_id = object.PostID
    post = Post.find(post_id)
    ser_data = ActiveModelSerializers::SerializableResource.new(post, each_serializer: ViewPostSerializerSerializer).as_json
    return ser_data
  end
end
