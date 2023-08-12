class AddDefaultValueToVersion < ActiveRecord::Migration[7.0]
  def change
    change_column :revisionhistories, :version, :integer, default: 1
  end
end
