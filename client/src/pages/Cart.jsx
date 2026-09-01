import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom';

const Cart = () => {
  const {cart,updateQuantity,removeFromCart}=useCart();
  const total = cart.reduce((sum,item)=>
    sum+ item.price *item.quantity,
  0
  )
  return (
    <div className='mx-auto max-w-7xl px-6 py-16 lg:px-8'>
      <h1 className='text-4xl font-bold'>
        Your Cart
      </h1>
      <div className="mt-10 space-y-4">
        {
          cart.map((item)=>(
            <div key={item.id} className='flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'>
              <img src="https://images.unsplash.com/photo-1579751626657-72bc17010498" alt="Pizza image" className='h-24 w-24 rounded-xl object-cover' />

              <div className='flex-1'>
                <h2 className='font-bold'>
                  {item.name}
                </h2>
                <p className='mt-1 text-sm text-gray-500'>
                  ${item.price.toFixed(2)}
                </p>
                <div className='mt-3 flex items-center justify-center'>
                  <div className='flex items-center rounded-full border border-gray-200'>
                    <button className='px-4 py-2 text-lg hover:text-red-600' type='button' onClick={()=>updateQuantity(item.id,item.quantity -1)}>
                      -
                    </button>
                    <span className='min-w-10 text-lg hover:text-red-600'>
                      {item.quantity}
                    </span>
                    <button className='px-4 py-2 text-lg hover:text-red-600' type='button' onClick={()=>updateQuantity(item.id,item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button className='mt-3 text-sm font-medium text-red-600 hover:text-red-700' type='button' onClick={()=>removeFromCart(item.id)}>
                  Remove
                </button>
              </div>

            </div>
          ))
        }
      </div>
      <div className='mt-10 border-t border-gray-200 pt-6'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-semibold'>
            Total
          </span>
          <span className='text-2xl font-bold text-red-600'>
            ${total.toFixed(2)}
          </span>
        </div>
        <Link to="/checkout" className='mt-6 block w-full rounded-full bg-red-600 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-red-700'>
          Proceed to checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart
