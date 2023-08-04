class FiltersController < ApplicationController
    skip_before_action :verify_authenticity_token
    include AuthenticationHelper

    def SearchAuthors
        response = AuthenticateUser(params)
        if response[:status] != 200
            render json: response
            return
        end
        
        keyword = params[:keyword]
        authorsByName = User.where(is_author: true).where("LOWER(username) LIKE ?", "%#{keyword.downcase}%")
        authorsByEmail = User.where(is_author: true).where("LOWER(email) LIKE ?", "%#{keyword.downcase}%")
        authors = authorsByEmail.or(authorsByName)
        ser_authors = ActiveModelSerializers::SerializableResource.new(authors, each_serializer: BasicUserDetailsSerializerSerializer).as_json

        render json: {authorsList: ser_authors, status: 200}
        return 
    end

    def SearchTopics
        response = AuthenticateUser(params)
        if response[:status] != 200
            render json: response
            return
        end
        
        keyword = params[:keyword]
        topics = Topic.where("LOWER(name) LIKE ?", "%#{keyword.downcase}%")
        render json: {topicsList: topics, status: 200}
        return 
    end

    def SearchPosts
        response = AuthenticateUser(params)
        if response[:status] != 200
            render json: response
            return
        end
        
        keyword = params[:keyword]
        posts = Post.where("LOWER(title) LIKE ?", "%#{keyword.downcase}%")
        render json: {postsList: posts, status: 200}
        return 
    end
end
