import React, { useEffect, useState } from 'react'
import PizzaCard from '../components/layout/pizza/PizzaCard';
import axios from 'axios';



const Menu = () => {

  const [pizzas,setPizzas]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/pizzas').then((response)=>{
      setPizzas(response.data.data)
    }).catch(()=>{
      setError("Unable to load pizzas. Please try again.");
    }).finally(()=>{
      setLoading(false);
    })
  },[])
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      {/* header */}
      <div className="text-center">
        <p className='text-sm font-semibold uppercase tracking-wider text-red-600'>
          Our menu
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Choose your pizza
        </h1>
        <p className="mx-auto mt-4 text-xl text-gray-600">
          Freshly made pizzas with quality ingredients. Pick your favourite and start your order.
        </p>
      </div>
      {error ? (
          <p className='mt-12 text-center text-red-600'>
            {error}
          </p>
      ):
      loading ? (
          <p className="mt-12 text-center text-gray-500">
            Loading pizzas...
          </p>
        ):(
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pizzas.map((pizza)=>(
            <PizzaCard
            key={pizza.id}
            pizza={pizza}
            />
          ))}
        </div>
        )
      }
    </div>
)
}

export default Menu;