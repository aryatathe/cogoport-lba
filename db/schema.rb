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

ActiveRecord::Schema[7.0].define(version: 2023_08_12_134241) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.text "description"
    t.integer "user_id"
    t.integer "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "drafts", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "postID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["postID"], name: "index_drafts_on_postID"
    t.index ["user_id"], name: "index_drafts_on_user_id"
  end

  create_table "followers", force: :cascade do |t|
    t.integer "to_id"
    t.integer "from_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["from_id"], name: "index_followers_on_from_id"
    t.index ["to_id"], name: "index_followers_on_to_id"
  end

  create_table "likesjunctions", force: :cascade do |t|
    t.integer "user_id"
    t.integer "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_likesjunctions_on_post_id"
    t.index ["user_id"], name: "index_likesjunctions_on_user_id"
  end

  create_table "lists", force: :cascade do |t|
    t.string "name"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_lists_on_user_id"
  end

  create_table "listsharedaccesses", force: :cascade do |t|
    t.string "userID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "list_id"
    t.index ["list_id"], name: "index_listsharedaccesses_on_list_id"
  end

  create_table "postidsforlists", force: :cascade do |t|
    t.string "PostID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "list_id"
    t.index ["list_id"], name: "index_postidsforlists_on_list_id"
  end

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
    t.boolean "published", default: false
    t.integer "version", default: 1
    t.index ["title"], name: "index_posts_on_title"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "posts_topics", id: false, force: :cascade do |t|
    t.integer "topic_id", null: false
    t.integer "post_id", null: false
  end

  create_table "readingtimes", force: :cascade do |t|
    t.integer "minutes", default: 0
    t.integer "user_id", null: false
    t.integer "postID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["postID"], name: "index_readingtimes_on_postID"
    t.index ["user_id"], name: "index_readingtimes_on_user_id"
  end

  create_table "revisionhistories", force: :cascade do |t|
    t.integer "version", default: 1
    t.string "title"
    t.string "content"
    t.string "featured_image"
    t.integer "post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "published"
    t.index ["post_id"], name: "index_revisionhistories_on_post_id"
  end

  create_table "savelaters", force: :cascade do |t|
    t.string "postID"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_savelaters_on_user_id"
  end

  create_table "topicrecommendations", force: :cascade do |t|
    t.string "name"
    t.float "recommendation_score"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_topicrecommendations_on_user_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_topics_on_name"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.text "about"
    t.integer "followers_count", default: 0
    t.integer "following_count", default: 0
    t.boolean "is_author"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "unique_emails", unique: true
    t.index ["token"], name: "index_users_on_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users"
  add_foreign_key "drafts", "users"
  add_foreign_key "followers", "users", column: "from_id"
  add_foreign_key "followers", "users", column: "to_id"
  add_foreign_key "likesjunctions", "posts"
  add_foreign_key "likesjunctions", "users"
  add_foreign_key "lists", "users"
  add_foreign_key "listsharedaccesses", "lists"
  add_foreign_key "postidsforlists", "lists"
  add_foreign_key "posts", "users"
  add_foreign_key "readingtimes", "users"
  add_foreign_key "revisionhistories", "posts"
  add_foreign_key "savelaters", "users"
  add_foreign_key "topicrecommendations", "users"
end
