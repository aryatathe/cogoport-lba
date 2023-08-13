class PaymentController < ApplicationController
  skip_before_action :verify_authenticity_token
  include AuthenticationHelper
  require 'razorpay'
  Razorpay.setup('rzp_test_msRmj7qx2sPWqv', 'bExIoR1QhV8qhKzYSPdtERcG')
    def CreateOrder
      response = AuthenticateUser(params)
      if response[:status] != 200
        render json: response
        return
      end

      order = Razorpay::Order.create(amount: params[:amount], currency: 'INR')
      render json: { orderId: order.id, status: 200 }
      return
    end

    def VerifyPayment
      response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end
        payment_id = params[:razorpay_payment_id]
      
        payment = Razorpay::Payment.fetch(payment_id)
        if payment.status != 'captured'
          payment.capture({ amount: payment.amount })
        end
        amount_paid = payment.amount

        user.num_of_posts_left = user.num_of_posts_left + amount_paid/100
        user.save
        render json: {msg: "Successfully purchased! You have #{user.num_of_posts_left} left!", status: 200}
        return
    end

    def AddCount
      #For Integration of Stripe frontend developer
      #Its just a bypass
      response = AuthenticateUser(params)
        user = nil
        if response[:status] != 200
            render json: response
            return
        else
            user = response[:user]
        end
        count = params[:count]
        user.num_of_posts_left = user.num_of_posts_left + count.to_i
        user.save
        render json: {msg: "Successfully purchased! You have #{user.num_of_posts_left} left!", status: 200}
        return
    end
end
