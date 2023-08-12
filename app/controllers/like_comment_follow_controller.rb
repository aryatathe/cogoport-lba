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

        if Likesjunction.where(user_id: user.id, post_id: post.id).first
            render json: {msg: "Already liked!", status: 400}
            return
        end

        Likesjunction.create(user_id: user.id, post_id: post.id)
        post.likes_count = post.likes_count + 1
        post.save

        topics = post.topics
        for topic in topics
            begin
                obj = Topicrecommendation.where(name: topic[:name], user_id: user.id).first
                obj.recommendation_score = obj.recommendation_score + 2
                obj.save
            rescue
                obj = Topicrecommendation.create(name: topic[:name], user_id: user.id)
                obj.recommendation_score = 2
                obj.save
            end
        end

        render json: {msg: "Liked!", status: 200}
        return
    end

    def UnLikePost
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

        if !Likesjunction.where(user_id: user.id, post_id: post.id).first
            render json: {msg: "Not liked yet!", status: 400}
            return
        else
            like = Likesjunction.where(user_id: user.id, post_id: post.id).first
            like.destroy
        end
        post.likes_count = post.likes_count - 1
        post.save

        topics = post.topics
        for topic in topics
            begin
                obj = Topicrecommendation.where(name: topic[:name], user_id: user.id).first
                obj.recommendation_score = obj.recommendation_score - 2
                obj.save
            rescue
            end
        end

        render json: {msg: "UnLiked!", status: 200}
        return
    end

    def AddComment
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        post_id = params[:post_id]
        if !(post_id && params[:comment_description])
            render json: {msg: "Post Id is missing!", status: 404}
            return
        end

        begin
            post = Post.find(post_id)
        rescue
            render json: {msg: "Post Id is invalid!", status: 400}
            return
        end

        Comment.create(description: params[:comment_description], user_id: user.id, post_id: post.id)

        topics = post.topics
        for topic in topics
            begin
                obj = Topicrecommendation.where(name: topic[:name], user_id: user.id).first
                obj.recommendation_score = obj.recommendation_score + 1
                obj.save
            rescue
                obj = Topicrecommendation.create(name: topic[:name], user_id: user.id)
                obj.recommendation_score = 1
                obj.save
            end
        end

        render json: {msg: "Added the comment!", status: 200}
        return
    end

    def DeleteComment
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        post_id = params[:post_id]
        if !(post_id && params[:comment_id])
            render json: {msg: "Post Id is missing!", status: 404}
            return
        end

        begin
            post = Post.find(post_id)
        rescue
            render json: {msg: "Post Id is invalid!", status: 400}
            return
        end

        begin
            comment = Comment.find(params[:comment_id])
            comment.destroy
        rescue
            render json: {msg: "Comment doesnt exists", status: 400}
            return
        end

        topics = post.topics
        for topic in topics
            begin
                obj = Topicrecommendation.where(name: topic[:name], user_id: user.id).first
                obj.recommendation_score = obj.recommendation_score + 1
                obj.save
            rescue
                obj = Topicrecommendation.create(name: topic[:name], user_id: user.id)
                obj.recommendation_score = 1
                obj.save
            end
        end

        render json: {msg: "Deleted the comment!", status: 200}
        return
    end

    def Follow
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        author_id = params[:author_id]
        if !(author_id)
            render json: {msg: "Author Id is missing!", status: 404}
            return
        end

        begin
            author = User.find(author_id)
        rescue
            render json: {msg: "Author Id is invalid!", status: 400}
            return
        end

        if(user.id == author.id)
            render json: {msg: "You can not follow yourself!", status: 400}
            return
        end

        followerObj = Follower.where(to_id: author.id, from_id: user.id).first
        if followerObj
            render json: {msg: "Already followed!", status: 400}
            return
        end

        Follower.create(to_id: author.id, from_id: user.id)

        author.followers_count = author.followers_count + 1
        author.save

        user.following_count = user.following_count + 1
        user.save

        render json: {msg: "Successfully followed!", status: 200}
        return
    end

    def UnFollow
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        author_id = params[:author_id]
        if !(author_id)
            render json: {msg: "Author Id is missing!", status: 404}
            return
        end

        begin
            author = User.find(author_id)
        rescue
            render json: {msg: "Author Id is invalid!", status: 400}
            return
        end

        if(user.id == author.id)
            render json: {msg: "You can not unfollow yourself!", status: 400}
            return
        end

        followerObj = Follower.where(to_id: author.id, from_id: user.id).first
        if !followerObj
            render json: {msg: "You have not followed the author!", status: 400}
            return
        end

        followerObj.destroy

        author.followers_count = author.followers_count - 1
        author.save

        user.following_count = user.following_count - 1
        user.save

        render json: {msg: "Successfully unfollowed!", status: 200}
        return

    end
end
