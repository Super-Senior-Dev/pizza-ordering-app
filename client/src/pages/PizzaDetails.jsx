import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext';

const PizzaDetails = () => {

  const {id}=useParams();
  const [pizza,setPizza]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [quantity,setQuantity]=useState(1);
  const {addToCart,cart}=useCart();
  const navigate=useNavigate();


  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/pizzas/${id}`)
    .then((response)=>{
      setPizza(response.data.data);
    }).catch(()=>{
      setError("Unable to load this pizza");
    }).finally(()=>{
      setLoading(false);
    })
  },[id])

  if(loading){
    return(
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-gray-500">Loading pizza...</p>
      </div>
    )
  }

  if(error){
    return(
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Pizza image */}
        <div>
          <img src="https://images.unsplash.com/photo-1579751626657-72bc17010498" alt="pizza image" className='h-[420px] w-full rounded-3xl object-cover shadow-sm' />
        </div>
        {/* Pizza information */}
        <div>
          <p className='text-sm font-semibold uppercase tracking-wider text-red-600'>
            Our Pizza
          </p>
          <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
            {pizza.name}
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            {pizza.description}
          </p>
          <div className='mt-8'>
            <h2 className='text-lg font-bold'>
              Ingredients
            </h2>
            <p className='mt-2 leading-7 text-gray-600'>
              {pizza.ingredients}
            </p>
          </div>
          <p className='mt-8 text-2xl font-bold text-red-600'>
            ${pizza.price.toFixed(2)}
          </p>

          {/* quantity */}
          <div className='mt-8 flex items-center gap-4 justify-center'>
            <span className='font-semibold'>
              Quantity
            </span>
            <div className='flex items-center rounded-full border border-gray-200'>
              <button className='px-4 py-2 text-lg hover:text-red-600' type='button' onClick={()=>setQuantity((q)=>Math.max(1,q-1))}>
                -
              </button>
              <span className='min-w-10 text-center font-semibold'>
                {quantity}
              </span>
              <button className='px-4 py-2 text-lg hover:text-red-600' type='button' onClick={()=>setQuantity((q)=>q+1)}>
                +
              </button>
            </div>
          </div>
          <button className='mt-8 w-full rounded-full bg-red-600 px-6 py-3.5 font-semibold text-white transition hover:bg-red-700'
          onClick={()=>{
            addToCart(pizza,quantity);
            navigate("/cart");
          }}
          >
            Add {quantity} to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaDetails
