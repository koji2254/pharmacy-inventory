import React from 'react'
import { NavLink } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Expenses = () => {
  return (
    <>
    <NavBar />

    <div className="mt-2">
        <div className="text-md font-light px-3 border-b py-2 flex items-center gap-2">
            <NavLink to='/'>
                <p>Dashboard </p>
            </NavLink>
            <span>/</span>
                <p>Records</p>
            <span>/</span>
        </div>
        <div className="px-3">
            <h1 className='text-bold text-2xl roboto my-2 md:my-4'>Records Summary & Expenses</h1>
            
        </div>

        <div className="w-full h-full md:w-9/12 px-3">

              <div className="text-3xl h-full mt-10 font-light w-full flex justify-center items-center roboto">
                <span>
                  This Page is Under Development
                </span>
              </div>
        </div>
      </div>
</>
  )
}

export default Expenses