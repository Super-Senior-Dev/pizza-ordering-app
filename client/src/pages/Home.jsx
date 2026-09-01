import React from 'react'
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';


const pizzas = [
  {
    id: 1,
    name: "Pepperoni",
    description: "Classic pepperoni with mozzarella and tomato sauce.",
    price: 12,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
  },
  {
    id: 2,
    name: "Margherita",
    description: "Fresh mozzarella, tomato, basil, and olive oil.",
    price: 10,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
  },
  {
    id: 3,
    name: "Vegetarian",
    description: "A fresh combination of vegetables and mozzarella.",
    price: 11,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e",
  },
];

const Home = () => {
  return (
    <>
        {/* hero section */}
        <section className='min-h-[70vh]'>
            <div className='mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2'>
                {/* Left side */}
                <div>
                    <span className='text-sm font-semibold uppercase tracking-wider text-red-600'>
                        Freshly made, simply delicius
                    </span>
                    <h1 className='mt-4 maz-w-xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl'>
                        Your favourite pizza, just a few clicks away.
                    </h1>
                    <p className='mt-6 max-w-lg text-lg leading-8 text-gray-600'>
                        Choose your favourite pizza, customize your order, and enjoy freshly made food without the wait.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-4">
                        <Link to="/menu" className='rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700'>
                            Order now
                        </Link>
                        <Link to="/menu" className='rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-100'>
                            View menu
                        </Link>
                    </div>
                </div>


                {/* Right side */}
                <div className='overflow-hidden rounded-3xl'>
                    <img
                        src="https://images.unsplash.com/photo-1579751626657-72bc17010498"
                        alt="Fresh pizza"
                        className="h-[420px] w-full object-cover"
                    />
                </div>
            </div>
        </section>

        {/* Pizzas section */}
        <section className='bg-gray-50 px-6 py-20 lg:px-8'>
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 flex items-end justify-between gap-6">
                    <div>
                        <p className='text-sm font-semibold uppercase tracking-wider text-red-600'>
                            Our favorites
                        </p>

                        <h2 className='mt-2 text-3xl font-bold tracking-tight sm:text-4xl'>
                            Popular pizzas
                        </h2>
                    </div>
                    <Link to="/menu" className='font-semibold hidden text-red-600 hover:text-red-700 sm:block'>
                        View all 
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pizzas.map((pizza)=>(
                <article key={pizza.id} className='overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
                    <img
                        src={pizza.image}
                        alt="Pepperoni pizza"
                        className="h-56 w-full object-cover"
                    />
                    <div className='p-5'>
                        <div className="flex items-center justify-between gap-4">
                            <h3 className="text-xl font-bold">
                                {pizza.name}

                            </h3>
                            <span className="font-bold text-red-600">
                                ${pizza.price.toFixed(2)}
                            </span>
                        </div>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                {pizza.description}
                            </p>
                            <Link to="/menu" className='mt-5 inline-block font-semibold text-gray-900 hover:text-red-600'>
                                Order this pizza
                            </Link>
                    </div>
                </article>

                ))}
            </div>
        </section>

        {/* Why choose us section */}
        <section className='mx-auto max-w-7xl px-6 py-20 lg:px-8'>
            <div className="grid gap-10 md:grid-cols-3">
                <div>
                    <h3 className="text-xl font-bold">
                        Fresh ingredients
                    </h3>
                    <p className="mt-3 leading-7 text-gray-600">
                        Quality ingredients in every pizza
                    </p>
                </div>
                <div>
                    <div className="text-xl font-bold">
                        Easy ordering
                    </div>
                    <p className="mt-3 leading-7 text-gray-600">
                        choose your pizza and place your order in seconds
                    </p>
                </div>
                <div>
                    <div className="text-xl font-bold">
                        Fast service
                    </div>
                    <p className="mt-3 leading-7 text-gray-600">
                        We prepare your order and keep you updated along the way
                    </p>
                </div>

            </div>
        </section>
    </>
  )
}

export default Home
