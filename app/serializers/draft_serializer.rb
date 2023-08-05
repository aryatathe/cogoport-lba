class DraftSerializer < ActiveModel::Serializer
  attributes :id, :post_details, :created_at, :updated_at
  def post_details
    post_id = object.postID
    post = Post.find(post_id)
    ser_post = ActiveModelSerializers::SerializableResource.new(post, each_serializer: ViewPostSerializerSerializer).as_json
    return ser_post
  end
end
