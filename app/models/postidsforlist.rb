class Postidsforlist < ApplicationRecord
    belongs_to(
        :list
    )
end