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
        publish_status = params[:publish_status]

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

        if publish_status == "true"
            post.publish_status = true
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

    def ViewMyPosts
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        posts = user.posts
        ser_posts = ActiveModelSerializers::SerializableResource.new(posts, each_serializer: ViewMyPostsSerializer).as_json

        render json: {posts: ser_posts, status: 200}
        return
    end

    def GetPost
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        if !params[:post_id]
            render json: {msg: "Parameter is missing!", status: 404}
            return
        end
        begin
            post = Post.find(params[:post_id])
        rescue
            render json: {msg: "Post id is Invalid!", status: 400}
            return
        end

        if (post.user_id != user.id)
            #Check for payment else return error
            if !post.published
                render json: {msg: "Unauthorized", status: 403}
                return
            end
            post.views_count = post.views_count+1
            post.save
            #Algorithm to calculate popularity of particular post to be in top posts
            post.popularity_metric = post.views_count * 1 + post.likes_count * 3 + post.comments_count * 2
        end

        ser_post = ActiveModelSerializers::SerializableResource.new(post, each_serializer: ViewPostSerializerSerializer).as_json

        #Level 5 integration, adding reading time
        readingMinutes = 0
        begin
            readingtimeObj = Readingtime.where(postID: post.id, user_id: user.id).first
            readingMinutes = readingtimeObj.minutes
        rescue
            readingtimeObj = Readingtime.create(postID: post_id, user_id: user.id)
        end

        ser_post[:readingMinutes] = readingMinutes

        render json: {post: ser_post, status: 200}
        return
    end

    def DeletePost
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        if !params[:post_id]
            render json: {msg: "Parameter is missing!", status: 404}
            return
        end
        begin
            post = Post.find(params[:post_id])
        rescue
            render json: {msg: "Post id is Invalid!", status: 400}
            return
        end

        if (post.user_id != user.id)
            render json: {msg: "You are not authorized to delete this post!", status: 403}
            return
        end

        post.destroy
        render json: {msg: "Post successfully deleted!", status: 200}
        return
    end

    def ViewPosts
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end
        #Level 4 remaining
        author = params[:author]
        start_date = params[:start_date]
        end_date = params[:end_date]
        sort_by_likes = params[:sort_by_likes]
        sort_by_comments = params[:sort_by_comments]

        posts = Post.all
        posts = posts.where(published: true)
        if author
            posts = Post.joins(:user).where("users.username LIKE ?", "%#{author}%")
        end

        if start_date && end_date
            posts = posts.where(created_at: params[:start_date]..params[:end_date])
        end

        if sort_by_comments
            posts = posts.order(comments_count)
        end

        if sort_by_likes == "true"
            posts = posts.order(likes_count: :desc)
        end

        ser_posts = ActiveModelSerializers::SerializableResource.new(posts, each_serializer: ViewMyPostsSerializer).as_json
        render json: {posts: ser_posts, status: 200}
        return
    end
end
