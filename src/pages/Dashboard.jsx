import React from 'react'
import NavBar from '../components/NavBar'
import { NavLink } from 'react-router-dom'
import IconUpload from '../assets/images/icons8-upload-48.png'
import IconTable from '../assets/images/icons8-shelve-48.png'

const Dashboard = () => {
  return (
    <>
        <NavBar />

        <section className="w-full">
            <div className="w-full px-2 md:w-8/12 m-auto mt-10 shadow">
                <div className="card-contaier p-2 grid grid-cols-2 gap-2">
                    <NavLink to='/products-table'>
                        <div className="rounded card flex justify-around items-center h-20 roboto border p-2 h-12 bg-gray-100 hover:shadow">
                            <p>Products Table</p>
                            <img src={IconTable} alt="" />
                        </div>
                    </NavLink>
                    <NavLink to='/create-product'>
                        <div className="rounded flex justify-around items-center h-20 roboto card border p-2 h-12 bg-gray-100">
                            <p>Upload Product</p>
                            <img src={IconUpload} alt="" />
                        </div>
                    </NavLink>
                    
                </div>
            </div>
        </section>
    </>
  )
}

export default Dashboard
