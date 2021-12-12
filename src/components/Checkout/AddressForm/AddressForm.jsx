import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { commerce } from '../../../lib/commerce'
import InputText from './InputText'

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingsubdivisions, setShippingSubdivisions] = useState([])
  const [shippingsubdivision, setShippingSubdivision] = useState('')
  const [shipingOptions, setShipingOptions] = useState([])
  const [shipingOption, setShipingOption] = useState('')

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
  const subdivisions = Object.entries(shippingsubdivisions).map(([code, name]) => ({ id: code, label: name }))
  const options = shipingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))

  const fetchCountries = async (checkoutTokenId) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
      setShippingCountries(countries)
      setShippingCountry(Object.keys(countries)[0])
    } catch (err) {
      console.log(err.message)
    }
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOption = async (checkoutTokenId, country, shippingsubdivision) => {
    try {
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, shippingsubdivision })
      setShipingOptions(options)
      setShipingOption(options[0].id)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchCountries(checkoutToken.id)
  }, [checkoutToken.id])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(() => {
    if (shippingsubdivision) fetchShippingOption(checkoutToken.id, shippingCountry, shippingsubdivision)
  }, [checkoutToken.id, shippingsubdivision, shippingCountry])

  const method = useForm()
  return (
    <div className="w-full">
      <h3 className="uppercase text-red-600 font-medium text-lg text-center">SHIPPING INFO</h3>
      <div className="w-20 h-0.5 border-red-600 border-b-2   mx-auto mb-4"></div>

      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit((data) => next({ ...data, shippingCountry, shippingsubdivision, shipingOption }))}>
          <div className="grid md:grid-cols-2 gap-x-2 gap-y-2 mb-5">
            <InputText name="firstName" placeholder="First Name" />
            <InputText name="lastName" placeholder="Last Name" />
            <InputText name="email" placeholder="Email" />
            <InputText name="address" placeholder="Address" />
            <InputText name="town" placeholder="City" />
            <InputText name="zip" placeholder="Zip" />
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="uppercase text-sm font-semibold text-gray-500">
                Shipping
                <span className="text-yellow-600"> Country</span>
              </h4>
              <select
                value={shippingCountry}
                className="block w-full text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm outline-none"
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <h4 className="uppercase text-sm font-semibold text-gray-500">
                Shipping <span className="text-yellow-600">Subdivisions</span>
              </h4>
              <select
                value={shippingsubdivision}
                className="block w-full text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm outline-none"
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <h4 className="uppercase text-sm font-semibold text-gray-500">
                Shipping <span className="text-yellow-600">Options</span>
              </h4>
              <select
                value={shipingOption}
                className="block w-full text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm outline-none"
                onChange={(e) => setShipingOption(e.target.value)}
              >
                {options.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-10 flex-grow text-right space-x-2">
            <Link
              to={'/cart'}
              className="bg-gradient-to-bl from-yellow-400 to-red-400 text-sm font-bold text-white uppercase rounded px-3 py-2 sm:px-5 sm:py-2"
            >
              BACK TO CART
            </Link>
            <button
              type="submit"
              className="bg-gradient-to-bl cursor-pointer from-green-400 to-green-600 text-sm font-bold text-white uppercase rounded px-3 py-2 sm:px-5 sm:py-2"
            >
              NEXT STEP
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default AddressForm
