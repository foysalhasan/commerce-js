import React from 'react'

const CartItem = ({ item, handleCartFunc }) => {
  const { handleUpdateQty, handleRemoveFrmCart } = handleCartFunc()
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="relative overflow-hidden">
        <img src={item.image.url} alt={item.name} className="rounded-md object-cover h-60 w-full" />
        <div className="absolute rounded-b-md py-2 bottom-0 text-center w-full bg-gray-500/70 text-white text-sm font-medium font-roboto">
          {item.line_total.formatted_with_symbol}
        </div>
      </div>
      <h3 className="font-semibold my-4 uppercase text-center text-yellow-700">{item.name}</h3>
      <div className="flex my-4 items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
            className="text-2xl font-medium px-5 text-gray-900  rounded-sm hover:bg-yellow-100"
          >
            -
          </button>
          <span className="mx-3 font-medium font-roboto text-yellow-700">{item.quantity}</span>
          <button
            onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
            className="text-2xl font-medium px-5 text-gray-900 rounded-sm hover:bg-yellow-100"
          >
            +
          </button>
        </div>
        <button
          onClick={() => handleRemoveFrmCart(item.id)}
          className="bg-gradient-to-bl from-yellow-400 to-red-400 text-sm font-bold text-white uppercase rounded px-5 py-2"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem
