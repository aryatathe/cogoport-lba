class TopAndRecommendatedPostController < ApplicationController
    skip_before_action :verify_authenticity_token
    include AuthenticationHelper

    def TopPosts
        response = AuthenticateUser(params)
        if response[:status] != 200
            render json: response
            return
        end

        top_posts = Post.order(popularity_metric: :desc).limit(10)
        ser_data = ActiveModelSerializers::SerializableResource.new(top_posts, each_serializer: ViewPostSerializerSerializer).as_json
        render json: {posts: ser_data, status: 200}
        return
    end

    def GetRecommendedPosts
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        topTopicRecommendations = Topicrecommendation.where(user_id: user.id).limit(5)
        render json: topTopicRecommendations
    end

end
