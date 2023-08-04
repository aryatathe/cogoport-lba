class LikeCommentFollowController < ApplicationController
    skip_before_action :verify_authenticity_token
    include AuthenticationHelper
    
    def LikePost
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        post_id = params[:post_id]
        if !post_id
            render json: {msg: "Post Id is missing!", status: 404}
            return
        end

        begin
            post = Post.find(post_id)
        rescue
            render json: {msg: "Post Id is invalid!", status: 400}
            return
        end

        Likesjunction.create(user_id: user.id, post_id: post.id)
        post.likes_count = post.likes_count + 1
        post.save

        topics = post.topics
        for topic in topics
            begin
                obj = Topic_recommendations.where(name: topic[:name], user_id: user.id).first
                obj.recommendation_score = obj.recommendation_score + 2
                obj.save
            rescue
                obj = Topic_recommendations.create(name: topic[:name], user_id: user.id)
                obj.recommendation_score = obj.recommendation_score + 2
                obj.save
            end
        end
    end

    def DeleteLikeOnPost
    end

    def AddComment
    end

    def DeleteComment
    end

    def FollowAuthor
        #Remember only follow if author
    end

    def UnFollowAuthor
    end
end
