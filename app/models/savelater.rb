class Savelater < ApplicationRecord
    belongs_to(
        :user
    )
end