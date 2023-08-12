class AddPublishedToRevisionhistory < ActiveRecord::Migration[7.0]
  def change
    add_column :revisionhistories, :published, :boolean
  end
end
