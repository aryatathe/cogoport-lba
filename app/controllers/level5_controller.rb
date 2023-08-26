class Level5Controller < ApplicationController
    skip_before_action :verify_authenticity_token
    include AuthenticationHelper

    def UpdateReadingTime
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        additional_minutes = params[:additional_minutes]
        post_id = params[:post_id]
        if(!(additional_minutes && post_id))
            render json: {msg: "Parameters are missing!", status: 200}
            return
        end

        begin
            post = Post.find(post_id)
        rescue
            render json: {msg: "Invalid post id", status: 400}
            return
        end

        readingtimeObj = nil
        begin
            readingtimeObj = Readingtime.where(postID: post_id, user_id: user.id).first
        rescue
            readingtimeObj = Readingtime.create(postID: post_id, user_id: user.id)
        end

        readingtimeObj.minutes = readingtimeObj.minutes + additional_minutes.to_i
        readingtimeObj.save

        topics = post.topics
        for topic in topics
            begin
                obj = Topicrecommendation.where(name: topic[:name], user_id: user.id).first
                obj.recommendation_score = obj.recommendation_score + 0.1 * additional_minutes.to_i
                obj.save
            rescue
                obj = Topicrecommendation.create(name: topic[:name], user_id: user.id)
                obj.recommendation_score = 0.1 * additional_minutes.to_i
                obj.save
            end
        end

        render json: {msg: "Reading time updated", status: 200}
        return
    end

    def AddToDrafts
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
            render json: {msg: "Post id is missing", status: 404}
            return
        end

        begin
            post = Post.find(post_id)
        rescue
            render json: {msg: "Post id is invalid", status: 400}
            return
        end

        if post.user_id != user.id
            render json: {msg: "Unauthorized", status: 403}
            return
        end

        draft = Draft.where(user_id: user.id, postID: post_id).first
        if draft
            render json: {msg: "Draft already exists", status: 400}
            return
        end
        
        Draft.create(user_id: user.id, postID: post_id)

        render json: {msg: "Added to Drafts", staus: 200}
        return
    end

    def GetDrafts
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        drafts = user.drafts
        ser_data = ActiveModelSerializers::SerializableResource.new(drafts, each_serializer: DraftSerializer).as_json
        render json: {drafts: ser_data, status: 200}
        return
    end

    def RemoveFromDrafts
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        draft_id = params[:draft_id]
        if !draft_id
            render json: {msg: "Draft id is missing", status: 404}
            return
        end

        begin
            draft = Draft.find(draft_id)
        rescue
            render json: {msg: "Draft id is invalid", status: 400}
            return
        end

        if draft.user_id != user.id
            render json: {msg: "Unauthorized", status: 403}
            return
        end

        draft.destroy

        render json: {msg: "Removed from Drafts", staus: 200}
        return
    end

    def AddToSaveLater
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
            render json: {msg: "Post id is missing", status: 404}
            return
        end

        begin
            post = Post.find(post_id)
        rescue
            render json: {msg: "Post id is invalid", status: 400}
            return
        end

        savelater = Savelater.where(user_id: user.id, postID: post_id).first
        if savelater
            render json: {msg: "Already saved for later", status: 400}
            return
        end

        Savelater.create(user_id: user.id, postID: post_id)

        render json: {msg: "Saved your post", status: 200}
        return
    end

    def GetSaveLaters
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        savelaters = user.savelaters
        ser_data = ActiveModelSerializers::SerializableResource.new(savelaters, each_serializer: SavelaterSerializer).as_json
        render json: {savelaters: ser_data, status: 200}
    end

    def RemoveFromSaveLater
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        save_later_id = params[:save_later_id]
        if !save_later_id
            render json: {msg: "save_later id is missing", status: 404}
            return
        end

        begin
            savelater = Savelater.find(save_later_id)
        rescue
            render json: {msg: "save_later id is invalid", status: 400}
            return
        end

        if savelater.user_id != user.id
            render json: {msg: "Unauthorized", status: 403}
        end

        savelater.destroy

        render json: {msg: "Removed from save later", status: 200}
        return
    end
    
    def CreateList
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        list_name = params[:list_name]
        if !list_name
            render json: {msg: "List name is missing", status: 404}
            return
        end

        list = List.where(name: list_name, user_id: user.id).first
        if list
            render json: {msg: "List already exists", status: 400}
            return
        end

        List.create(name: list_name, user_id: user.id)
    
        render json: {msg: "Successfully created the list", status: 200}
        return
    end

    def AddToList
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        list_id = params[:list_id]
        post_id = params[:post_id]
        if !(list_id && post_id)
            render json: {msg: "Parameters are missing", status: 404}
            return
        end

        begin
            list = List.find(list_id)
        rescue
            render json: {msg: "Invalid List id", status: 400}
            return
        end

        if list.user_id != user.id
            render json: {msg: "Unauthorized", status: 403}
        end

        begin
            post = Post.find(post_id)
        rescue
            render json: {msg: "Invalid Post id", status: 400}
            return
        end

        postidforlistobj = Postidsforlist.where(list_id: list_id, PostID: post.id).first
        if !postidforlistobj
            Postidsforlist.create(list_id: list_id, PostID: post_id)
        end

        render json: {msg: "Successfully added to the list!", status: 200}
        return
    end

    def RemoveFromList
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        list_id = params[:list_id]
        post_id = params[:post_id]
        if !(list_id && post_id)
            render json: {msg: "Parameters are missing", status: 404}
        end

        begin
            list = List.find(list_id)
        rescue
            render json: {msg: "Invalid List id", status: 400}
            return
        end

        if list.user_id != user.id
            render json: {msg: "Unauthorized", status: 403}
        end

        postidforlistobj = Postidsforlist.where(PostID: post_id, list_id: list_id).first
        if !postidforlistobj
            render json: {msg: "Invalid Post id", status: 400}
            return
        end

        postidforlistobj.destroy

        render json: {msg: "Successfully removed from the list!", status: 200}
        return
    end

    def ViewAllLists
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        lists = user.lists
        contains=[]

        for list in lists
            for obj in list.postidsforlists
                if obj.PostID==params[:post_id]
                    contains << obj.list_id
                end
            end
        end

        render json: {lists: lists, contains: contains, status: 200}
    end

    def GetList
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        list_id = params[:list_id]
        if !list_id
            render json: {msg: "List id is missing", status: 404}
            return
        end

        begin
            list = List.find(list_id)
        rescue
            render json: {msg: "Invalid List", status: 400}
            return
        end

        access = false
        if list.user_id == user.id
            access = true
        end

        shared_accesses = list.listsharedaccesses

        for obj in shared_accesses
            if obj[:userID]== "#{user.id}" 
                access = true
            end
        end

        if !access
            render json: {msg: "Unauthorized", status: 403}
            return
        end

        ser_data = ActiveModelSerializers::SerializableResource.new(list, each_serializer: ListSerializer).as_json
        render json: {list: ser_data, status: 200}
        return
    end

    def shareList
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        list_id = params[:list_id]
        shared_user_id = params[:shared_user_id]
        if !(list_id&& shared_user_id)
            render json: {msg: "Params are missing", status: 404}
            return
        end

        begin
            list = List.find(list_id)
        rescue
            render json: {msg: "Invalid List", status: 400}
            return
        end

        if list.user_id != user.id
            render json: {msg: "Unauthorized", status: 403}
            return
        end

        Listsharedaccess.create(userID: shared_user_id, list_id: list_id)
        render json: {msg: "Shared access added", status: 200}
        return
    end

    def ViewAVersionOfPost
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
            render json: {msg: "Unauthorized", status: 403}
            return
        end

        versionNumber = params[:version]
        begin
            postVersion = Revisionhistory.where(post_id: post.id, version: versionNumber).first
        rescue
            render json: {msg: "Invalid version!", status: 400}
            return
        end

        render json: {version: postVersion, status: 200}
        return
    end

    def GetAllVersions
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
            render json: {msg: "Unauthorized", status: 403}
            return
        end

        postVersions = Revisionhistory.where(post_id: post.id)
        ser_data = ActiveModelSerializers::SerializableResource.new(postVersions, each_serializer: AllVersionsSerializer).as_json
        
        render json: {versions: ser_data, status: 200}
        return
    end


end
