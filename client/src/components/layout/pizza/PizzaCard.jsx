import React from 'react'
import { Link } from 'react-router-dom'

const PizzaCard = ({pizza}) => {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <img
            src={`http://127.0.0.1:8000${pizza.image}`}
            
            alt={pizza.name}
            className="h-56 w-full object-cover"
        />

        <div className="p-5">
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

            <Link
                to={`/menu/${pizza.id}`}
                className="mt-5 inline-block font-semibold text-gray-900 hover:text-red-600">
                Order this pizza →
            </Link>
        </div>

    </article>
  )
}

export default PizzaCard
