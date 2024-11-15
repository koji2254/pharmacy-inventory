import React, { useEffect, useState }from 'react'
import NavBar from '../components/NavBar'
import { NavLink } from 'react-router-dom'
import Alert from '../components/Alert'
import Spinner from '../components/Spinner'
import CenterAlert from '../components/CenterAlert'
import axios from 'axios'
import { API_BASE_URL } from '../assets/Proxy'


const ProductsTable = () => {


    const [products, setProducts] = useState([])
    const [loading, setLaoding] = useState(false)

    useEffect(() => {

        setLaoding(true)
        axios.get(`${API_BASE_URL}/products`)
        .then((response) => {
            console.log(response.data)
            const products = response.data.products

            setProducts(products)
        })
        .catch((error) => {
            console.log(error.response.data.message)

        })
        .finally(() => {
            setLaoding(false)
        })



    }, [])


  return (
    <>
      <NavBar />
      {/* <Alert /> */}
      {/* <Spinner /> */}
      {/* <CenterAlert status='bad' text='Error occured' /> */}
    {loading && <Spinner text='Getting Products List' />}

    <section className='w-full'>
        <div className="mt-2">
            <div className="flex px-4 justify-between items-center">
                <h2 className='font-bold roboto uppercase text-blue-900 text-lg'>Products Table</h2>
                <NavLink to='/create-product'>
                    <button className='text-white bg-blue-900 text-xs uppercase font-mono hover:scale-105 px-2 rounded p-1 flex items-center gap-2'>
                    New Product
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    </button>
                </NavLink>
                
            </div>
            <div className="flex mt-2 p-2 px-4 bg-gray-950">
                <div className="w-full flex gap-2 items-center ">
                    <input placeholder='Search Product' type="text" className='bg-gray-800 text-white p-2 border border-pink-900 h-8 rounded text-sm w-5/6'/>
                    <button className='text-white hover:bg-gray-600 border-blue-900 text-xs h-8 rounded p-2'>Search</button>
                </div>
            </div>
            <div className="">
                

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Roll Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                    <tr key={product.productId} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {product.productTitle}
                        </th>
                        <td className="px-6 py-4">
                            {product.productCategory}
                        </td>
                        <td className="px-6 py-4">
                            {product.productId}
                        </td>
                        <td className="px-6 py-4">
                            ${product.price}
                        </td>
                        <td className="px-6 py-4">
                            <NavLink to={`/edit-product/${product.productId}`} className="font-medium text-blue-600 hover:underline">
                                Edit
                            </NavLink>
                        </td>
                    </tr>
                ))}

                    </tbody>
                </table>
            </div>

            </div>
        </div>
    </section>
    </>
  )
}

export default ProductsTable
