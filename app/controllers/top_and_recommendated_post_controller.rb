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
        recommendations = []
        topTopicRecommendations = Topicrecommendation.where(user_id: user.id).order(popularity_metric: :desc).limit(5)
        for topTopic in topTopicRecommendations
            topTopicName = topTopic[:name]
            topicObj = Topic.find_by(name: topTopicName)
            allPosts = topicObj.posts
            recommededPost = allPosts.order(popularity_metric: :desc).first
            ser_data = ActiveModelSerializers::SerializableResource.new(recommededPost, each_serializer: ViewPostSerializerSerializer).as_json
            recommendations.push(ser_data)
        end

        top_posts = Post.order(popularity_metric: :desc).limit(10)
        ser_top_posts = ActiveModelSerializers::SerializableResource.new(top_posts, each_serializer: ViewPostSerializerSerializer).as_json

        finalRecommendations = (ser_top_posts.to_a + ser_top_posts.to_a).uniq

        render json: {recommendations: finalRecommendations, status: 200}
        return
    end

end
