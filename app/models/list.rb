class List < ApplicationRecord
    belongs_to(
        :user
    )
    has_many :postidsforlists, dependent: :destroy, class_name: 'Postidsforlist'
    has_many :listsharedaccesses, dependent: :destroy, class_name: 'Listsharedaccess'
end