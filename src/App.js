import './App.css'
import { commerce } from './lib/commerce'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Cart, Navbar, Products, Checkout } from './components'

function App() {
  // INFO: FETCH PRODUCTS
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [order, setOrder] = useState({})
  const [errorMsg, setErrorMsg] = useState('')

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  // INFO: FETCH CART

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }
  const handleUpdateQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    setCart(cart)
  }
  const handleRemoveFrmCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)
    setCart(cart)
  }
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty()
    setCart(cart)
  }

  const handleCartFunc = () => {
    return {
      handleUpdateQty,
      handleRemoveFrmCart,
      handleEmptyCart,
    }
  }

  // INFO: PAYMENT HANDLE
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incommingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incommingOrder)
      refreshCart()
    } catch (err) {
      setErrorMsg(err.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <>
      <Router>
        <Navbar totalCartItems={cart.total_items} />
        <Routes>
          <Route path="/" element={<Products products={products} handleAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} handleCartFunc={handleCartFunc} />} />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} order={order} setOrder={setOrder} errorMsg={errorMsg} handleCaptureCheckout={handleCaptureCheckout} />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
