module AuthenticationHelper
    def AuthenticateUser(params)
        response = {}
        if !(params[:token])
            response[:msg] = 'Missing or invalid user token'
            response[:status] = 400 
            return response
        end

        user = User.find_by(token: params[:token])
        
        if user
            response[:user] = user
            response[:status] = 200
        else
            response[:msg] = "Either Token is invalid or expired!"
            response[:status] = 400
        end
        return response
    end
end