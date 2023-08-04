class Post < ApplicationRecord
    # has_one_attached :image
    belongs_to(
        :user
    )
    has_many :comments, dependent: :destroy
    has_many :likesjunctions, dependent: :destroy
    has_and_belongs_to_many :topics
end