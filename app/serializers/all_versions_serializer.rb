class AllVersionsSerializer < ActiveModel::Serializer
  attributes :version, :title, :featured_image, :created_at, :updated_at, :published, :content
end
