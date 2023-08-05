class ListSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :posts
  def posts
    temp = object.postidsforlists
    posts = ActiveModelSerializers::SerializableResource.new(temp, each_serializer: PostidforlistSerializer).as_json
    return posts
  end
end
