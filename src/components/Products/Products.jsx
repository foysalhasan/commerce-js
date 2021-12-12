import React from 'react'
import Product from './Product/Product'
import { ImSpinner9 } from 'react-icons/im'

const Products = ({ products, handleAddToCart }) => {
  //   INFO: SPINNER
  if (!products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <ImSpinner9 className="text-5xl animate-spin text-green-500 -mt-16" />
      </div>
    )
  }
  return (
    <main className="container px-4 mx-auto py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>
        ))}
      </div>
    </main>
  )
}

export default Products
