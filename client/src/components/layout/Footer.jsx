import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t border-gray-200 bg-white'>
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-bold">
                        Pizza Home
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Fresh pizza, simple ordering.
                    </p>
                </div>
                <p className="text-sm text-gray-500">
                    © 2026 Pizza House. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
