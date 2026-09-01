import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Orders from './pages/Orders'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import MainLayout from './components/layout/MainLayout'
import PizzaDetails from './pages/PizzaDetails'
import { CartProvider } from './context/CartContext'
import Checkout from './pages/Checkout'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import OrderDetails from './pages/OrderDetails'
import AdminRoute from './components/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLayout from './components/layout/AdminLayout'
import Pizzas from './pages/admin/Pizzas'
import AdminOrders from './pages/admin/AdminOrders'
import AdminOrderDetails from './pages/admin/AdminOrderDetails'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster
      position='top-right'
      toastOptions={{
        duration:3000
      }}
      />
      <CartProvider>
        <Routes>

          {/* Customer layout */}
          <Route element={<MainLayout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/menu' element={<Menu/>} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/menu/:id' element={<PizzaDetails/>}/>


            <Route element={<ProtectedRoute/>}>
              <Route path='/orders' element={<Orders/>}/>
              <Route path='/checkout' element={<Checkout/>}/>
              <Route path='/orders/:id' element={<OrderDetails/>}/>
            </Route>
            <Route element={<GuestRoute/>}>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
            </Route>

          </Route>

          {/* Admin layout */}
          <Route element={<AdminRoute/>}>
            <Route element={<AdminLayout/>}>
              <Route path='/admin' element={<AdminDashboard/>}/>
              <Route path='/admin/pizzas' element={<Pizzas/>}/>
              <Route path='/admin/orders' element={<AdminOrders/>}/>
              <Route path='/admin/orders/:id' element={<AdminOrderDetails/>}/>
            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </>
  )
}

export default App
