import React, { useEffect, useState } from 'react'
import { commerce } from '../../lib/commerce'
import AddressForm from './AddressForm/AddressForm'
import PaymentForm from './PaymentForm/PaymentForm'
import { ImSpinner9 } from 'react-icons/im'
import { FcOk } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

const steps = ['shipping', 'payment']

const Checkout = ({ cart, handleCaptureCheckout, order, errorMsg, setOrder }) => {
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const navigate = useNavigate()

  const next = (data) => {
    setShippingData(data)
    nextStep()
  }
  const nextStep = () => {
    setActiveStep((prev) => prev + 1)
  }
  const prevStep = () => {
    setActiveStep((prev) => prev - 1)
  }

  const Form = ({ timeOut }) =>
    activeStep === 0 ? (
      <AddressForm next={next} checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm
        handleCaptureCheckout={handleCaptureCheckout}
        nextStep={nextStep}
        prevStep={prevStep}
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        timeOut={timeOut}
      />
    )

  const goHome = () => {
    navigate('/')
    setOrder({})
  }
  console.log(order)
  const Confirmation = () =>
    order.customer ? (
      <div className="text-center">
        <FcOk className="text-6xl inline-block mb-3" />
        <h2 className="text-transparent uppercase bg-clip-text text-lG font-bold bg-gradient-to-br from-red-500 to-yellow-500">
          THANK YOU {`${order.customer.firstname} ${order.customer.lastname}`} FOR ORDER !
        </h2>
        <h5 className="text-sm font-semibold text-gray-500 mb-3">REF: {order.customer_reference}</h5>
        <button
          onClick={goHome}
          className="bg-gradient-to-bl inline-block from-yellow-400 to-red-400 text-sm font-bold text-white uppercase rounded px-3 py-2 sm:px-5 sm:py-2"
        >
          HOME
        </button>
      </div>
    ) : isFinished ? (
      <div className="text-center">
        <FcOk className="text-6xl inline-block mb-3" />
        <h2 className="text-transparent uppercase bg-clip-text text-lG font-bold bg-gradient-to-br from-red-500 to-yellow-500">THANK YOU FOR ORDER !</h2>
        <button
          onClick={goHome}
          className="bg-gradient-to-bl inline-block from-yellow-400 to-red-400 text-sm font-bold text-white uppercase rounded px-3 py-2 sm:px-5 sm:py-2"
        >
          HOME
        </button>
      </div>
    ) : (
      <div className="text-center">
        <ImSpinner9 className="animate-spin text-4xl text-red-500 inline-block" />
      </div>
    )
  const timeOut = () => {
    setTimeout(() => {
      setIsFinished(true)
    }, 3000)
  }

  useEffect(() => {
    console.log(cart)
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
        setCheckoutToken(token)
      } catch (err) {
        console.log(err.message)
        // navigate('/')
      }
    }
    generateToken()
  }, [cart])

  return (
    <div className="py-10 lg:py-20 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-sm w-full md:w-4/5 xl:w-1/2 px-5 py-10 space-y-5">
        <h2 className="text-center font-black text-4xl text-yellow-600">CHECKOUT</h2>
        {checkoutToken && (
          <div className="bg-gray-200 h-2 rounded-sm mb-3">
            <div className={`${activeStep === 0 ? 'w-1/2' : 'w-full'} h-full bg-red-500 rounded-sm`}></div>
          </div>
        )}
        {!checkoutToken && (
          <div className="pt-32 pb-20 flex items-center justify-center text-center">
            <ImSpinner9 className="text-5xl animate-spin text-green-500 -mt-16" />
          </div>
        )}
        {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form timeOut={timeOut} />}
      </div>
    </div>
  )
}

export default Checkout
