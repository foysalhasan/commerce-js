import React from 'react'
import OrderReview from '../OrderReview/OrderReview'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API)

const PaymentForm = ({ prevStep, checkoutToken, shippingData, handleCaptureCheckout, nextStep, timeOut }) => {
  console.log(shippingData)
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault()
    if (!stripe || !elements) return
    const cardElements = elements.getElement(CardElement)
    const paymentMethodResponse = await stripe.createPaymentMethod({ type: 'card', card: cardElements })
    if (paymentMethodResponse.error) {
      alert(paymentMethodResponse.error.message)
      return
    } else {
      const orderData = {
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethodResponse.paymentMethod.id,
          },
        },
        line_items: checkoutToken.live.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: {
          name: 'International',
          street: shippingData.address,
          town_city: shippingData.town,
          county_state: shippingData.shippingsubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shipingOption },
      }
      handleCaptureCheckout(checkoutToken.id, orderData)
      timeOut()
      nextStep()
    }
  }
  return (
    <div className="w-full">
      <h3 className="uppercase text-red-600 font-medium text-lg text-center">payment</h3>
      <div className="w-10 h-0.5 bg-red-600 mx-auto"></div>
      <div className="my-3">
        <h3 className="text-yellow-600 text-lg font-bold inline-block border-b-4 border-double border-yellow-500 mb-5">ORDER SUMMARY</h3>

        <OrderReview checkoutToken={checkoutToken}></OrderReview>

        <h3 className="text-yellow-600 mt-5 text-lg font-bold inline-block border-b-4 border-double border-yellow-500 mb-5">PAYMENT METHOD</h3>

        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement className="bg-gray-100 rounded focus:border-2 focus:border-yellow-500 p-4"></CardElement>
                <br />
                <div className=" flex-grow text-right space-x-2">
                  <button
                    onClick={prevStep}
                    className="bg-gradient-to-bl  from-yellow-400 to-red-400 text-sm font-bold text-white uppercase rounded px-3 py-2 sm:px-5 sm:py-2"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    disabled={!stripe}
                    className="bg-gradient-to-bl  cursor-pointer from-green-400 to-green-600 text-sm font-bold text-white uppercase rounded px-3 py-2 sm:px-5 sm:py-2"
                  >
                    PAY {checkoutToken.live.subtotal.formatted_with_symbol}
                  </button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    </div>
  )
}

export default PaymentForm
