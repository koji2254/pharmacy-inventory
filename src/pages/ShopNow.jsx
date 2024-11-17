import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { API_BASE_URL } from '../assets/Proxy'
import NavBar from '../components/NavBar'
import SingleProductCard from '../components/SingleProductCard'

import axios from 'axios'


const ShopNow = () => {

    const [onShowHistory, setOnSshowHistory] = useState(false)
    const [onShowCart, setOnShowCart] = useState(false)
    const [onProduct, setOnProduct] = useState(false)

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(null)
    const [loading, setLaoding] = useState(false)

    const [cartItems, setCartItems] = useState(() => {
        // Initialize state from localStorage, or start with an empty array
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    
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


    // POP TO SHOW A SINGLE PRODUCT
    const showSingleProduct = (productId) => {

        const product = products.find((p) => p.productId === productId)

        console.log(product)
        if (product) {
            setProduct(product)
            setOnProduct(true)
            
            
            // Show product details (you can replace alert with more detailed logic)
            // alert(`Product ID: ${product.productId}\nProduct Title: ${product.productTitle}\nPrice: ${product.price}`);

        } else {
            alert("Product not found");
        }
    }

    const closeSingleProduct = () => {
        setOnProduct(false)
    }


    const showCart = (e) => {

        alert('showCart')
    }

    const showHistory = () => {
        alert('show History')
    }

    const addProductToCart = (productOrder) => {

        const updatedCart = [...cartItems, productOrder];
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Save to localStorage
      
    };


  return (
    <>
      <NavBar />  
       {onProduct && <SingleProductCard 
            product={product} 
            closeSingleProduct={closeSingleProduct}
            addProductToCart={addProductToCart}
            
            /> 
        }


      <section className="">
        <div className="">
            <div className="flex items-center justify-between border-b px-2 py-1">
                <div className="flex items-center gap-2">
                    <h3 className='font-bold'>Slales</h3>
                    <button onClick={showHistory} className='text-sm p-1 bg-gray-200 rounded'>History</button>
                </div>
                
                <button onClick={(e) => showCart(e)} className="flex items-center border p-1 rounded-full  h-10 w-10 hover:bg-gray-200 cursor-pointer">                    
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <span className='text-red-500 font-bold text-xs'>2</span>
                </button>
            </div>
             <div className="flexp-2 p-1 px-4 bg-gray-950">
                <div className="w-full flex gap-2 items-center ">
                    <input placeholder='Search Product' type="text" className='bg-gray-800 text-white p-2 border border-pink-900 h-8 rounded text-sm w-5/6'/>
                    <button className='text-white hover:bg-gray-600 border-blue-900 text-xs h-8 rounded p-2'>Search</button>
                </div>
            </div>

            {/*  */}
            {/*  */}
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-900 p-4 m-2 h-96 overflow-scroll">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-300">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                    <tr onClick={() => showSingleProduct(product.productId)} key={product.productId} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 hover:border hover:border-gray-100">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {product.productTitle}
                        </th>
                        <td className="px-6 py-4">
                            {product.price}
                        </td>
                    </tr>
                ))}

                    </tbody>
                </table>
            </div>
        </div>
      </section>

    </>
  )
}

export default ShopNow