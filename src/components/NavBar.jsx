import React from 'react'
import { NavLink } from 'react-router-dom'

import IconPharmacy from '../assets/images/icons8-pharmacy-48.png'

const NavBar = () => {
  return (
    <>
    <nav className="p-4 border flex justify-between bg-pink-950 mx-1 rounded my-1">
      <div className="flex items-center gap-2">
         
         <h1 className="font-extrabold text-xl uppercase font-mono text-white">Pharmacy Inventory 
            <img src={<IconPharmacy />} alt="" />
         </h1>
      </div>
      
      <div className="flex gap-1 items-center">
        <NavLink to='/dashboard'>
            <button className="font-bold text-xs p-2 px-1 text-gray-50 flex gap-1 items-center">
                <i class="fa-solid fa-user"></i>
                Dashboard
            </button>
        </NavLink>
        {/* <NavLink to='/login'>
            <button className="text-white font-bold text-xs p-2 px-1 text-gray-900">Login</button>
        </NavLink>
        <NavLink to='/login'>
         <button className="bg-gray-100 rounded-full font-bold text-xs p-2 px-1 text-gray-900 text-red-600">Logout</button>
        </NavLink> */}
         
      </div>
   </nav>

   </>
  )
}

export default NavBar