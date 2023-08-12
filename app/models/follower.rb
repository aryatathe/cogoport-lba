class Follower < ApplicationRecord
    belongs_to :follower, class_name: 'User', foreign_key: 'from_id'
    belongs_to :following, class_name: 'User', foreign_key: 'to_id'
end