import React from 'react'
import CartItem from './CartItem/CartItem'
import { ImSpinner9 } from 'react-icons/im'
import noCart from '../../assets/nocart.png'
import { Link } from 'react-router-dom'

const Cart = ({ cart, handleCartFunc }) => {
  const { handleEmptyCart } = handleCartFunc()

  const EmptyCart = () => {
    return (
      <div className="text-center mt-4">
        <img src={noCart} className="h-40 mx-auto mb-3 animate-pulse" alt="Cart Empty" />
        <h2 className="font-medium text-gray-600 text-base sm:text-xl">
          Your Cart is Empty.{' '}
          <Link to="/" className="text-yellow-600 hover:text-red-600 hover:underline">
            Add Some Products
          </Link>
        </h2>
      </div>
    )
  }
  const FilledCart = () => (
    <div className="my-10 space-y-10">
      <div className="grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cart.line_items.map((item) => (
          <CartItem key={item.id} item={item} handleCartFunc={handleCartFunc} />
        ))}
      </div>
      <div className="bg-white flex flex-col gap-y-2 md:gap-y-0 md:flex-row items-center justify-between mx-auto max-w-3xl border-b-4 border-double border-yellow-500/80 rounded-sm shadow-sm p-5">
        <div>
          <span className="font-medium text-gray-800 mr-2">SUB TOTAL:</span>
          <span className="font-bold text-red-700">{cart.subtotal.formatted_with_code}</span>
        </div>
        <div className="flex-grow text-right space-x-2">
          <button
            onClick={handleEmptyCart}
            className="bg-gradient-to-bl from-yellow-400 to-red-400 text-sm font-bold text-white uppercase rounded px-3 py-2 sm:px-5 sm:py-2"
          >
            EMPTY CART
          </button>
          <Link
            to="/checkout"
            className="bg-gradient-to-bl cursor-pointer from-green-400 to-green-600 text-sm font-bold text-white uppercase rounded px-3 py-2 sm:px-5 sm:py-2"
          >
            CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  )

  //   INFO: SPINNER
  if (!cart.line_items) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <ImSpinner9 className="text-5xl animate-spin text-yellow-600 -mt-16" />
      </div>
    )
  }

  return (
    <div className="container  px-4 py-10 mx-auto">
      <h1 className="text-lg sm:text-2xl lg:text-4xl text-center bg-clip-text text-transparent font-roboto font-bold uppercase bg-gradient-to-r from-red-500 to-yellow-500 px-3 mx-auto">
        your shopping cart
      </h1>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </div>
  )
}

export default Cart
