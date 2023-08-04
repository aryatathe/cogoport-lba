require 'bcrypt'

class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    include AuthenticationHelper

    def Login
        email = params[:email]
        password = params[:password]
        user = User.find_by(email: email)

        if !(user && user.authenticate(password))
            render json: {msg: "Either email or password is wrong!", status: 404}
            return
        end

        token = SecureRandom.uuid
        user.token = token
        user.save
        
        userDetails = ActiveModelSerializers::SerializableResource.new(user, each_serializer: UserLoginSerializer).as_json
        response = {
            userDetails: userDetails,
            status: 200
        }

        render json: response
        return
    end

    def SignUp
        if !(params[:email] && params[:password])
            render json: { msg: 'Missing or invalid user parameter', status: 400 }
            return
        end

        email = params[:email]
        password = params[:password]

        user = User.find_by(email: email)
        if user
            render json: {msg: "User already exists!", status: 400}
            return
        end

        user = User.create(email: email, password: password)
        token = SecureRandom.uuid
        user.token = token
        user.save

        userDetails = ActiveModelSerializers::SerializableResource.new(user, each_serializer: UserLoginSerializer).as_json
        response = {
            userDetails: userDetails,
            status: 200
        }

        render json: response
        return
    end

    def EditUserDetails
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        username = params[:username]
        is_author = params[:is_author]
        profile_pic = params[:profile_pic]

        if username
            user.username = username
        end

        if is_author
            if is_author == "true"
                user.is_author = true
            else
                user.is_author = false
            end
        end

        if profile_pic
            user.profile_pic.attach(params[:profile_pic])
        end

        user.save
        render json: {msg: "User details are successfully updated!", status: 200}
        return
    end

    def ChangePassword
        response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end

        if (!params[:password])
            render json: {msg: "Empty string is not allowed!", status: 400}
            return
        end

        user.password = params[:password]
        user.save

        render json: {msg: "Password successfully updated!", status: 200}
        return
    end

    def ViewProfile
        response = AuthenticateUser(params)
        if response[:status] != 200
            render json: response
            return
        end

        user_id = params[:user_id]
        if !user_id
            render json: {msg: "User id is missing!", status: 404}
            return
        end

        begin
            user = User.find(user_id)
        rescue
            render json: {msg: "User is Invalid!", status: 400}
            return
        end

        ser_data = ActiveModelSerializers::SerializableResource.new(user, each_serializer: UserDetailsSerializer).as_json
        render json: {profile: ser_data, status: 200}
        return
    end
end
