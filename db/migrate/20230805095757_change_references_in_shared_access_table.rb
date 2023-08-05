class ChangeReferencesInSharedAccessTable < ActiveRecord::Migration[7.0]
  def change
    remove_reference :listsharedaccesses, :lists, foreign_key: true
    add_reference :listsharedaccesses, :list, foreign_key: true
  end
end
