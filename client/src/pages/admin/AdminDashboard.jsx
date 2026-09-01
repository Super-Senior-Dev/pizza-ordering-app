import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import StatusBadges from './StatusBadges';

const AdminDashboard = () => {
  const {user}=useAuth();
  const [dashboard,setDashboard]=useState(null);
  const [loading,setLoading]=useState(true);


  useEffect(()=>{
    const fetchDashboard=async ()=>{
      try{
        const response=await api.get('/admin/dashboard');
        console.log("Dashboard:",response.data);
        setDashboard(response.data);
      }catch(error){
        console.log(error.response?.data || error.message);
      }finally{
        setLoading(false);
      }
    }
    fetchDashboard();
  },[]);

  if(loading){
    return(
      <div className='p-6 md:p-8'>
        <p className="text-gray-500">Loading Dashboard...</p>
      </div>
    )
  }

  return (
    <div className='p-6 md:p-8'>
      <div>
        <p className='text-sm font-medium text-gray-500'>
          Dashboard
        </p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          welcome back, {user?.name}
        </h1>
        <p className='mt-2 text-gray-500'>
          Here's an overview of your resturant.
        </p>
      </div>

      {/* Statics */}
      <div className='mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
          <p className='text-sm font-medium text-gray-500'>
            Total Orders
          </p>
          <p className='mt-3 text-3xl font-bold text-gray-900'>
            {dashboard?.total_orders ?? 0}
          </p>
        </div>

        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
          <p className='text-sm font-medium text-gray-500'>
            Pending Orders
          </p>
          <p className='mt-3 text-3xl font-bold text-yellow-600'>
            {dashboard?.pending_orders ?? 0}
          </p>
        </div>

        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
          <p className='text-sm font-medium text-gray-500'>
            Total Pizzas
          </p>
          <p className='mt-3 text-3xl font-bold text-gray-900'>
            {dashboard?.total_pizzas ?? 0}
          </p>
        </div>

        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
          <p className='text-sm font-medium text-gray-500'>
            Revenue
          </p>
          <p className='mt-3 text-3xl font-bold text-green-600'>
            ${(Number(dashboard?.revenue ?? 0)).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div className='mt-8 grid gap-6 md:grid-cols-1'>

        {/* Recent Orders */}
        <div className=' rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-bold text-gray-900'>
                Recent orders
              </h2>
              <p className='mt-4 text-sm text-gray-500'>
                Recent Orders will apear here.
              </p>
            </div>
          </div>
          {
            dashboard?.recent_orders?.length > 0 ?(
              <>
              {/* // Mobile */}
              <div className='mt-5 space-y-3 md:hidden'>
                {
                  dashboard.recent_orders.map((order)=>(
                    <div key={order.id} className='rounded-xl border border-gray-100 p-4'>
                      <div className='flex items-center justify-between gap-3'>
                        <div>
                          <p className='font-semibold text-gray-900'>
                            Order #{order.id}
                          </p>
                          <p className='mt-1 text-sm text-gray-500'>
                            {order.user?.name}
                          </p>
                          <p className='mt-1 text-sm text-gray-500'>
                            {order.user?.email}
                          </p>
                        </div>
                        <StatusBadges status={order.status}/>
                      </div>
                      <div className='mt-4 flex items-center justify-between border-t border-gray-100 pt-3 '>
                        <p className='font-bold text-gray-900'>
                          ${Number(order.total_price).toFixed(2)}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {order.created_at}
                        </p>
                      </div>
                      <Link className='mt-3 block w-full rounded-lg bg-gray-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-gray-800'
                      to={`/admin/orders/${order.id}`}
                      >
                        View details
                      </Link>
                    </div>

                  ))
                }

              </div>
              {/* // Desctop */}
              <div className='mt-6 overflow-x-auto md:block hidden'>
                <table className='w-full min-w-[650px] text-left'>
                  <thead>
                    <tr className='border-b border-gray-200 text-sm text-gray-500'>
                      <th className='px-4 py-3 font-medium'>Order</th>
                      <th className='px-4 py-3 font-medium'>Customer</th>
                      <th className='px-4 py-3 font-medium'>Status</th>
                      <th className='px-4 py-3 font-medium'>Total</th>
                      <th className='px-4 py-3 font-medium'>Date</th>
                      <th className='px-4 py-3 text-right font-medium'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dashboard.recent_orders.map((order,index)=>(
                        <tr key={index} className='border-b border-gray-100 transition hover:bg-gray-50 last:border-0'>
                          <td className='px-4 py-4 font-semibold text-gray-900'>
                            <Link to={`/admin/orders/${order.id}`} className='font-semibold text-red-600 transition hover:text-red-700'>
                              #{order.id}
                            </Link>
                          </td>
                          <td className='px-4 py-4'>
                            <p className='font-medium text-gray-900'>
                              {order.user?.name}
                            </p>
                            <p className='mt-1 text-sm text-gray-900'>
                              {order.user?.email}
                            </p>
                          </td>
                          <td className='px-4 py-4'>
                            <StatusBadges status={order.status}/>
                          </td>
                          <td className='px-4 py-4 font-semibold text-gray-900'>
                            ${Number(order.total_price).toFixed(2)}
                          </td>
                          <td className='px-4 py-4 text-sm text-gray-500'>
                            {order.created_at}
                          </td>
                          <td className='px-4 py-4 text-right'>
                            <Link to={`/admin/orders/${order.id}`}
                            className='font-semibold text-red-600 transition hover:text-red-700'
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              </>
            ):(
              <p className='mt-6 text-sm text-gray-500'>
                No orders yet.
              </p>
            )
          }

        </div>
        {/* Quick actions */}
        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
          <h2 className='text-lg font-bold text-gray-900'>
            Quick Actions
          </h2>

          <div className='mt-5 flex text-center justify-between flex-col sm:flex-row gap-3'>
            <Link to="/admin/pizzas" className='rounded-xl bg-red-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-red-700 '>
              Add Pizza
            </Link>
            <Link to="/admin/orders" className='rounded-xl border border-gray-200 px-4 py-3 text-gray-700 font-semibold text-center transition hover:bg-gray-50'>
              Manage Orders
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default AdminDashboard
