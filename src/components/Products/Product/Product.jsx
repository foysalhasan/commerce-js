import React from 'react'
import { MdOutlineAddShoppingCart } from 'react-icons/md'

const Product = ({ product, handleAddToCart }) => {
  return (
    <div className="bg-white shadow-sm border-b-4 border-gray-300 transition duration-300 hover:border-yellow-500 rounded-sm text-gray-500">
      <div className="relative">
        <img className="select-none" src={product.image.url} alt={product.name} />
        <div className="absolute font-roboto w-16 text-center top-2 right-2 py-1 bg-black/40 font-medium text-white rounded">${product.price.raw}</div>
      </div>
      <div className="space-y-1 p-4">
        <h4 className="font-roboto tracking-wide font-semibold text-gray-700 uppercase">{product.name}</h4>
        <h5 className="text-sm" dangerouslySetInnerHTML={{ __html: product.description }}></h5>
        <div className="text-right">
          <MdOutlineAddShoppingCart
            className="inline-block text-yellow-700 text-3xl hover:text-red-600 cursor-pointer"
            onClick={() => handleAddToCart(product.id, 1)}
          />
        </div>
      </div>
    </div>
  )
}

export default Product
