# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_03_102918) do
  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.string "featured_image"
    t.string "content"
    t.integer "comments_count", default: 0
    t.integer "likes_count", default: 0
    t.integer "views_count", default: 0
    t.integer "popularity_metric", default: 0
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.string "password"
    t.text "about"
    t.string "profile_pic"
    t.integer "followers_count", default: 0
    t.integer "following_count", default: 0
    t.boolean "is_author"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "unique_emails", unique: true
    t.index ["token"], name: "index_users_on_token", unique: true
    t.index ["username"], name: "unique_usernames", unique: true
  end

  add_foreign_key "posts", "users"
end
