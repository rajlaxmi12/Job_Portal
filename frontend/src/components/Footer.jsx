import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-glay-500 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Job Portal</h2>
            <p className="text-gray-400">Connecting talent with opportunity</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" className="hover:text-purple-500">
            
            </a>
            <a href="https://twitter.com" className="hover:text-purple-500">
            </a>
            <a href="https://linkedin.com" className="hover:text-purple-500">
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          &copy; 2025 Job Portal. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
