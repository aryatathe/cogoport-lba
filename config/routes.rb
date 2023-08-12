Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post "/login", to: "users#Login"
  post "/sign-up", to: "users#SignUp"
  post "/edit-user-details", to: "users#EditUserDetails"
  post "/change-password", to: "users#ChangePassword"
  get "/get-profile", to: "users#ViewProfile"

  post "/create-post", to: "posts#CreatePost"
  put "/update-post", to: "posts#UpdatePost"
  get "/view-my-posts", to: "posts#ViewMyPosts"
  get "/view-posts", to: "posts#ViewPosts"
  get "/get-post", to: "posts#GetPost"
  delete "/delete-post", to: "posts#DeletePost"

  get "/search-authors", to: "filters#SearchAuthors"
  get "/search-topics", to: "filters#SearchTopics"
  get "/search-posts", to: "filters#SearchPosts"

  post "/like-post", to: "like_comment_follow#LikePost"
  post "/unlike-post", to: "like_comment_follow#UnLikePost"
  post "/add-comment", to: "like_comment_follow#AddComment"
  post "/delete-comment", to: "like_comment_follow#DeleteComment"
  post "/follow-user", to: "like_comment_follow#Follow"
  post "/unfollow-user", to: "like_comment_follow#UnFollow"

  get "/get-top-posts", to: "top_and_recommendated_post#TopPosts"
  get "/get-recommendations", to: "top_and_recommendated_post#GetRecommendedPosts"

  #Level 5
  put "/update-reading-time", to: "level5#UpdateReadingTime"
  post "/add-to-drafts", to: "level5#AddToDrafts"
  get "/get-drafts", to: "level5#GetDrafts"
  delete "/remove-from-drafts", to: "level5#RemoveFromDrafts"
  post "/add-to-save-laters", to: "level5#AddToSaveLater"
  get "/get-save-laters", to: "level5#GetSaveLaters"
  delete "/remove-from-save-laters", to: "level5#RemoveFromSaveLater"
  post "/create-list", to: "level5#CreateList"
  post "/add-to-list", to: "level5#AddToList"
  delete "/remove-from-list", to: "level5#RemoveFromList"
  get "/view-all-lists", to: "level5#ViewAllLists"
  get "/get-list", to: "level5#GetList"
  post "/share-list", to: "level5#shareList"
  get "/view-a-version-of-post", to: "level5#ViewAVersionOfPost"
end
