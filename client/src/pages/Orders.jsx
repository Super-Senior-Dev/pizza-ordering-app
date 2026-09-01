import React, { useEffect, useState } from 'react'
import api from '../api/axios';
import { Link } from 'react-router-dom';


const getStatusStyle=(status)=>{
  switch(status){
    case "pending":
      return "bg-yellow-100 text-yellow-700"
    case "preparing":
      return "bg-blue-100 text-blue-700"
    case "delivered":
      return "bg-green-100 text-green-700"
    case "canceled":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const Orders = () => {
  const [orders,setOrders]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  
  useEffect(()=>{
    const fetchOrders= async ()=>{
      try{
        const response=await api.get("/orders");
        setOrders(response.data.data);
      }catch(error){
        console.log(error.response?.data);
        setError("Unable to laod your orders");
      }finally{
        setLoading(false);
      };
    }
    fetchOrders();
  },[])

  if(loading){
    return(
      <div className='mx-auto max-w-7xl px-6 py-16'>
        <p className='text-gray-500'>
          Loading orders...
        </p>
      </div>
    )
  }
  if(error){
    return(
      <div className='mx-auto max-w-7xl py-16 px-6'>
        <p className='text-red-600'>{error}</p>
      </div>
    )
  }
  return (
    <div className='mx-auto max-w-7xl px-6 py-16'>
      <h1 className='text-3xl font-bold text-gray-900'>
        My orders
      </h1>
      {
        orders.length === 0 ?(
          <p className='mt-8 text-gray-500'>
            You haven't placed any orders yet.
          </p>
        ) :(
          <div className='mt-8 space-y-6'>
            {
              orders.map((order)=>(
                <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'
                key={order.id}
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2 className='text-lg font-bold'>
                        Order #{order.id}
                      </h2>
                      <p className='mt-1 text-sm text-gray-500'>
                        {order.created_at}
                      </p>
                    </div>
                    <span className={`rounded-full px-4 text-sm py-1.5 font-semibold capitalize ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className='mt-6 space-y-3'>
                    {
                      order.items.map((item)=>(
                        <div className='flex items-center justify-between' id={item.id}>
                          <div>
                            <p className='font-medium'>
                              {item.pizza.name}
                            </p>
                            <p className='text-sm text-gray-500'>
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className='font-semibold'>
                            ${Number(item.subtotal).toFixed(2)}
                          </p>
                        </div>
                      ))
                    }
                  </div>
                  <div className='mt-6 flex justify-between border-t border-gray-100 pt-4'>
                    <span className='font-semibold'>
                      Total
                    </span>
                    <span className='text-xl font-bold text-red-600'>
                      ${Number(order.total_price).toFixed(2)}
                    </span>
                  </div>
                  <div className='mt-6 border-t border-gray-100 pt-5'>
                    <Link to={`/orders/${order.id}`} className='inline-flex rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700'>
                    View details
                    </Link>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
      
    </div>
  )
}

export default Orders
