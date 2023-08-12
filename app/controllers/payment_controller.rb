class PaymentController < ApplicationController
    def create_order
        order = Razorpay::Order.create(amount: params[:amount], currency: 'INR')
        render json: { orderId: order.id }
        return
    end

    def verify_payment
        payment_id = params[:payment_id]
        razorpay_order_id = params[:order_id]
        razorpay_signature = params[:razorpay_signature]
    
        client = Razorpay::Client.new(api_key: 'rzp_test_msRmj7qx2sPWqv', api_secret: 'bExIoR1QhV8qhKzYSPdtERcG')
    
        # Verify payment signature
        verified = client.utility.verify_payment_signature(
          razorpay_order_id,
          payment_id,
          razorpay_signature
        )
    
        if verified
          # Capture the payment using payment_id
          payment = client.payment.fetch(payment_id)
          payment.capture({ amount: payment.amount })
    
          render json: { message: 'Payment captured successfully' }
          return
        else
          render json: { message: 'Payment verification failed' }, status: :unprocessable_entity
          return
        end
    end
end
