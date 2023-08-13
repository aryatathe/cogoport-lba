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
        author_id = params[:author_id]
        postsByKeyword = []
        postsByAuthor = []
        if keyword != nil
            postsByKeyword = Post.where("LOWER(title) LIKE ?", "%#{keyword.downcase}%")
            serPostsByKeyword = ActiveModelSerializers::SerializableResource.new(postsByKeyword, each_serializer: ViewMyPostsSerializer).as_json
        end
        if author_id != nil
            begin
                author = User.find(author_id)
                postsByAuthor = author.posts
                serPostsByAuthor = ActiveModelSerializers::SerializableResource.new(postsByAuthor, each_serializer: ViewMyPostsSerializer).as_json
            end
        end

        posts = (serPostsByKeyword.to_a + serPostsByAuthor.to_a).uniq
        
        render json: {postsList: posts, status: 200}
        return 
    end
end
