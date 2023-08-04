class PostsController < ApplicationController
    skip_before_action :verify_authenticity_token
    include AuthenticationHelper

    def CreatePost
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        title = params[:title]
        featured_image = params[:featured_image]
        content = params[:content]
        topics = params[:topics]

        post = Post.create(user_id: user.id, title: title, featured_image: featured_image, content: content)
        for topic in topics
            existingTopicObj = Topic.find_by(name: topic)
            if existingTopicObj
                post.topics << existingTopicObj
            else
                newTopicObj = Topic.create(name: topic)
                post.topics << newTopicObj
            end
        end

        render json: {msg: "Post successfully created!", status: 200}
        return
    end

    def UpdatePost
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        begin
            params.require(:post_id)
        rescue
            render json: {msg: "Post id is missing!", status: 404}
            return
        end
        
        post_id = params[:post_id]
        title = params[:title]
        featured_image = params[:featured_image]
        content = params[:content]
        topics = params[:topics]

        post = Post.find(post_id)
        if !post || post.user_id != user.id
            render json: {msg: "Post Id is invalid!", status: 400}
            return
        end

        if title
            post.title = title
        end

        if featured_image
            post.featured_image = featured_image
        end

        if content
            post.content = content
        end

        post.save

        for topicName in topics
            existingTopicObj = Topic.find_by(name: topicName)
            if existingTopicObj
                found = post.topics.find {|topicObj| topicObj.name == topicName}
                if !found
                    post.topics << existingTopicObj
                end
            else
                newTopicObj = Topic.create(name: topicName)
                post.topics << newTopicObj
            end
        end

        render json: {msg: "Post successfully updated!", status: 200}
        return
    end
end
