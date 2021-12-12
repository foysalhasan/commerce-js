import React from 'react'
import logo from '../../assets/commerce.png'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ totalCartItems }) => {
  const location = useLocation()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container flex justify-between p-4 items-center">
        <Link
          to="/"
          className="text-lg sm:text-2xl select-none flex gap-x-1 text-transparent bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text uppercase font-bold font-dancer items-center"
        >
          <img src={logo} alt="commerce" className="h-8 sm:h-12" />
          Fh Commerce
        </Link>
        <div className="relative">
          {location.pathname === '/' && (
            <Link to="/cart">
              <MdOutlineShoppingCart className="text-4xl font-medium text-gray-500 cursor-pointer" />
              <div className="w-5 absolute -top-1 -right-1 font-roboto h-5 text-[10px] bg-red-600 text-white rounded-full text-center font-bold  flex items-center justify-center">
                {totalCartItems}
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
