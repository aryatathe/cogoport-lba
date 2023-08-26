class UserLoginSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :email, :followers_count, :following_count, :token, :is_author, :profile_pic_url, :pfp
  def profile_pic_url
    if object.profile_pic.attached?
      url_for(object.profile_pic)
    end
  end
  def default_url_options
    { host: 'localhost', port: '3000' }
  end
end
