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

    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search input

    // Filtered products based on the search query
    const filteredProducts = products.filter((product) =>
      product.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
    );
  

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
                    <input 
                        placeholder='Search Product' 
                        type="text" 
                        alue={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='bg-gray-800 text-white p-2 border border-pink-900 h-8 rounded text-sm w-5/6'/>
                </div>
            </div>
            <div className="">
                

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm roboto text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>                            
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map((product) => (
                    <tr key={product.productId} className="border-b odd:bg-gray-100 even:bg-gray-50">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {product.productTitle}
                        </th>
                        <td className="px-6 py-4">
                            {product.price}
                        </td>
                        <td className="px-6 py-4 text-xs">
                            {product.productCategory}
                        </td>
                        <td className="px-6 py-4 text-center">
                            <NavLink to={`/edit-product/${product.productId}`} className="hover:underline flex items-center justify-center border border-pink-800 cursor-pointer p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                </svg>

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
