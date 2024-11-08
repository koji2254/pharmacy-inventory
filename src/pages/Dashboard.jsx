import React from 'react'
import NavBar from '../components/NavBar'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
        <NavBar />

        <section className="w-full">
            <div className="w-full px-2 md:w-8/12 m-auto mt-10 shadow">
                <div className="card-contaier p-2 grid grid-cols-2 gap-2">
                    <NavLink to='/products-table'>
                        <div className="rounded-lg card border p-2 h-12 bg-gray-100 hover:shadow">
                            <p>Products Table</p>
                        </div>
                    </NavLink>
                    <NavLink to='/create-product'>
                        <div className="rounded-lg card border p-2 h-12 bg-gray-100">
                            <p>Upload Product</p>
                        </div>
                    </NavLink>
                    
                </div>
            </div>
        </section>
    </>
  )
}

export default Dashboard
