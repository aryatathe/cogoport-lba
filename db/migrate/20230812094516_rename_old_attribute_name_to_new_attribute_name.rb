class RenameOldAttributeNameToNewAttributeName < ActiveRecord::Migration[7.0]
  def change
    rename_column :revisionhistories, :posts_id, :post_id
  end
end
