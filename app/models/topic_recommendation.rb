class Topic_recommendations < ApplicationRecord
    belongs_to(
        :user
    )
end