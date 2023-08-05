class ChangeReferencesInPostidsforlists < ActiveRecord::Migration[7.0]
  def change
    remove_reference :postidsforlists, :lists, foreign_key: true
    add_reference :postidsforlists, :list, foreign_key: true
  end
end
