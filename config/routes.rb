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
end
