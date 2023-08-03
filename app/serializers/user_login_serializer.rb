class UserLoginSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :profile_pic, :followers_count, :following_count, :token, :is_author
end
