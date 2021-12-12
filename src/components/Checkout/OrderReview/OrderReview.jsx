import React from 'react'

const OrderReview = ({ checkoutToken }) => {
  console.log()
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th className="border text-left px-4 py-2 border-gray-300 text-red-600">NAME</th>
          <th className="border text-left px-4 py-2 border-gray-300 text-red-600">QUANTITY</th>
          <th className="border text-left px-4 py-2 border-gray-300 text-red-600">PRICE</th>
        </tr>
      </thead>
      <tbody>
        {checkoutToken.live.line_items.map((item) => (
          <tr key={item.id}>
            <td className="border border-gray-300 py-2 px-4 uppercase text-sm font-medium">{item.name}</td>
            <td className="border border-gray-300 py-2 px-4 text-sm font-medium">{item.quantity}</td>
            <td className="border border-gray-300 py-2 px-4 text-sm font-medium">{item.line_total.formatted_with_symbol}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2} className="border font-bold text-gray-800 border-gray-300  py-2 px-4 text-sm">
            TOTAL
          </td>
          <td className="py-2 px-4 text-red-600 font-bold">{checkoutToken.live.subtotal.formatted_with_code}</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default OrderReview
