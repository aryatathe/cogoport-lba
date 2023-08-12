class Revisionhistory < ApplicationRecord
    belongs_to(
        :post
    )
end