Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post "/login", to: "users#Login"
  post "/sign-up", to: "users#SignUp"
  post "/edit-user-details", to: "users#EditUserDetails"
  post "/change-password", to: "users#ChangePassword"

  post "/create-post", to: "posts#CreatePost"
  put "/update-post", to: "posts#UpdatePost"
  get "/view-my-posts", to: "posts#ViewMyPosts"
  get "/view-posts", to: "posts#ViewPosts"
  get "/get-post", to: "posts#GetPost"
  delete "/delete-post", to: "posts#DeletePost"

  get "/search-authors", to: "filters#SearchAuthors"
  get "/search-topics", to: "filters#SearchTopics"
  get "/search-posts", to: "filters#SearchPosts"
end
