class User < ApplicationRecord
    # has_one_attached :profile_pic
    has_many(
    :posts,
    dependent: :destroy
  )
end