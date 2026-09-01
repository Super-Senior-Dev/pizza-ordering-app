import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import axios from 'axios';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const {cart,setCart}= useCart();

    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");

    const [submitting,setSubmitting]=useState(false);
    const [error,setError]=useState("");

    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();

        setSubmitting(true);
        setError("");

        try{
            const response = await api.post("/orders",{
                phone,
                address,
                items: cart.map((item)=>({
                    pizza_id: item.id,
                    quantity: item.quantity
                }))
            })

            console.log(response.data);
            setCart([]);
            navigate('/orders')
        }catch(error){
            console.log("Order error:",error);
            console.log("Server error:",error.response?.data)
            setError(
                error.response?.data?.message ||"Unable to place your order"
            )
        } finally {
            setSubmitting(false);
        }
    }

  return (
    <div className='mx-auto max-w-7xl px-6 py-16 lg:px-8'>
        <h1 className='text-4xl font-bold'>
            Checkout
        </h1>

        <div className='mt-10 grid gap-12 lg:grid-cols-2'>
            {/* Customer information */}
            <div>
                <h2 className='text-2xl font-bold'>
                    Delivery Information
                </h2>
                <div className='mt-6 space-y-6'>
                    <form onSubmit={handleSubmit}>
                        <div>

                            <label className='block text-sm font-semibold' htmlFor="phone">
                                Phone
                            </label>

                            <input required type="text" id='phone' value={phone} className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500' 
                            onChange={(e)=>setPhone(e.target.value)}
                            placeholder='Enter your phone number'
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className='block text-sm font-semibold'>
                                Address
                            </label>

                            <textarea required id="address"
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            rows={4}
                            className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
                            placeholder='Enter your delivery address'
                            ></textarea>
                        </div>
                        {
                            error && (
                                <p className='mt-4 text-sm text-red-600'>
                                    {error}
                                </p>
                            )
                        }

                        <button type='submit' disabled={submitting || cart.length ===0} className='mt-8 w-full rounded-full bg-red-600 px-6 py-3.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50'>
                            {submitting ? "Place order...": "Place order"}
                        </button>

                    </form>
                </div>

            </div>
            {/* Order summary */}
            <div>
                <h2 className='text-2xl font-bold'>
                    Your order

                </h2>
                <div className="mt-6 space-y-4">
                    {cart.map((item)=>(
                        <div key={item.id} className='flex items-center justify-between'>
                            <div>
                                <p className="font-semibold">
                                    {item.name}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {item.quantity} x ${item.price.toFixed(2)}
                                </p>
                            </div>
                            <p className='font-semibold'>
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Checkout
