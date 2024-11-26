import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { API_BASE_URL } from '../assets/Proxy'
import NavBar from '../components/NavBar'
import SingleProductCard from '../components/SingleProductCard'

import axios from 'axios'
import CenterAlert from '../components/CenterAlert'
import Spinner from '../components/Spinner'
import LoadingBtn from '../components/LoadingBtn'

const ShopNow = () => {    

    const [loading, setLaoding] = useState(false)
    const [alertMessage, setAlertMessage] = useState(null)


    const [customerName, setCustomerName] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('CASH')
    const [amountPaid, setAmountPaid] = useState(0)

    const [isCartVisible, setIsCartVisible] = useState(false);  // Visibility state
    const [cartTotal, setCartTotal] = useState(0);

    const [activeProduct, setActiveProduct] = useState(null)
    const [activeDescription, setActiveDescription] = useState(null)
    const [activeQty, setActiveQty] = useState(0)
    const [activePrice, setActivePrice] = useState(null)

    const [onShowHistory, setOnSshowHistory] = useState(false)
    const [onShowCart, setOnShowCart] = useState(false)
    const [onProduct, setOnProduct] = useState(false)

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(null)

    const [cartItems, setCartItems] = useState([]);

    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search input

    // Filtered products based on the search query
    const filteredProducts = products.filter((product) =>
      product.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
    );
  
    
  useEffect(() => {

    if(alertMessage !== null){
      setTimeout(() => {
        setAlertMessage(null)
      }, 2000)
    }

  },[alertMessage])

    useEffect(() => {

        setLaoding(true)
        axios.get(`${API_BASE_URL}/products`)
        .then((response) => {
            console.log(response.data)
            const products = response.data.products

            setProducts(products)
        })
        .catch((error) => {
            console.log(error)

        })
        .finally(() => {
            setLaoding(false)
        })
    }, [])


    useEffect(() => {
        let tabsonCart = localStorage.getItem('tabson_cart');
        
        if (!tabsonCart) {
          // Initialize cart with the first product
          return;
        } else {
          // Parse existing cart and add the new product
          tabsonCart = JSON.parse(tabsonCart);  // Convert to an array
        }
      
        // Update React state if applicable
        calculateTotal(tabsonCart)
        setCartItems(tabsonCart);
    }, [])

    // POP TO SHOW A SINGLE PRODUCT
    const showSingleProduct = (productId) => {

        const product = products.find((p) => p.productId === productId)

        console.log(product)
        if (product) {
            setProduct(product)
            setOnProduct(true)

        } else {
            alert("Product not found");
        }
    }

    const closeSingleProduct = () => {
        setOnProduct(false)
    }


    const showHistory = () => {
        alert('show History')
    }


    const addProductToCart = (productOrder) => {
        // Generate a random string for itemId
        const itemId = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      
        // Attach itemId to the productOrder object
        let order = { ...productOrder, itemId };  // Spread productOrder and add itemId
      
        // Retrieve existing cart items from localStorage
        let tabsonCart = localStorage.getItem('tabson_cart');
        
        if (!tabsonCart) {
          // Initialize cart with the first product
          localStorage.setItem('tabson_cart', JSON.stringify([order]));
        } else {
          // Parse existing cart and add the new product
          tabsonCart = JSON.parse(tabsonCart);  // Convert to an array
      
          // Ensure tabsonCart is an array before pushing
          if (Array.isArray(tabsonCart)) {
            tabsonCart.push(order);
            localStorage.setItem('tabson_cart', JSON.stringify(tabsonCart));
          }
        }
      
        // Update React state if applicable
        calculateTotal(tabsonCart)
        setCartItems(tabsonCart);

        closeSingleProduct()
      };

      const deleteItem = (itemId) => {
        // Retrieve the cart from localStorage
        let tabsonCart = localStorage.getItem('tabson_cart');
        
        if (tabsonCart) {
          // Parse the existing cart
          tabsonCart = JSON.parse(tabsonCart);
      
          // Filter out the item with the specified itemId
          const updatedCart = tabsonCart.filter(item => item.itemId !== itemId);
      
          // Update localStorage with the filtered array
          localStorage.setItem('tabson_cart', JSON.stringify(updatedCart));
      
          // Update the React state to reflect the chang
          calculateTotal(updatedCart)
          setCartItems(updatedCart);
        }
      };
      
        // Handle quantity change
        const handleQuantityChange = (itemId, newQuantity) => {
            const updatedCart = cartItems.map((item) => {
            if (item.itemId === itemId) {
                const updatedSubTotal = item.price * newQuantity;
                return { ...item, quantity: newQuantity, subTotal: updatedSubTotal };
            }
            return item;
            });
            setCartItems(updatedCart);
            localStorage.setItem('tabson_cart', JSON.stringify(updatedCart));
            calculateTotal(updatedCart);
        };

        // Calculate total cart value
        // Calculate total cart value
        const calculateTotal = (cart) => {
            const total = cart.reduce((acc, item) => acc + item.subTotal, 0);
            setCartTotal(total);

            console.log(cart)
        };

        const procesCart = () => {
            const data = {
                cartItems,
                cartInfo: {
                    amountPaid: +amountPaid,
                    customerName,
                    paymentStatus: 'nill',
                    paymentMethod,
                    cartTotal
                }
            }

            if(customerName === ''){
               return setAlertMessage({message: 'Insert Customer Name', type: 'bad'})
            }

            // return console.log(data)
            setLaoding(true)
            axios.post(`${API_BASE_URL}/save-cart-info`, data)
            .then((response) => {

                console.log(response)
               
                localStorage.setItem('tabson_cart', []);
                setCartTotal(0)

                setCartItems([])
                
                return setAlertMessage({message: 'Successfull', type:'good'})
            })
            .catch((error) => {

                console.log(error)
            })
            .finally(() => {
                setLaoding(false)
            })
        }
      

  return (
    <>
       {onProduct && <SingleProductCard 
            product={product} 
            closeSingleProduct={closeSingleProduct}
            addProductToCart={addProductToCart}
            
            /> 
        }

        {alertMessage && <CenterAlert type={alertMessage.type} text={alertMessage.message} />}
        {loading && <Spinner />}


      <section className="">

        <div className="shop-fixed-nav border-b">
            <NavBar />
            {/* <p className='text-2xl mono py-2 px-2 text-pink-800'>TABSON STORE</p> */}
            <div className="flex items-center justify-between px-2 py-1">
                <button onClick={() => setIsCartVisible(true)} 
                    className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <span className='text-red-500 font-bold text-xs'>{cartItems.length}</span>
                </button>
                 
            </div>
             <div className="flexp-2 p-1 px-4">
                <div className="w-full flex gap-2 items-center ">
                    <input 
                        placeholder='Search Product' 
                        type="text" 
                        className='search-input text-black border border-pink-800 mono p-2 h-8 rounded text-sm w-5/6'
                        alue={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on change
                    />
                    <NavLink to='/history'>
                        <button className='font-light text-sm p-1 bg-pink-900 rounded text-white hover:bg-pink-950 roboto'>History</button>
                    </NavLink>
                </div>
            </div>
        </div>


        <div className='mt-32 flex gap-2'>
            <div class="relative w-full md:w-3/5 h-5/6">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 roboto">
                <thead class="text-xs text-gray-900 uppercase bg-gray-100">
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
                        </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map((product) => (
                    <tr onClick={() => showSingleProduct(product.productId)} key={product.productId} className="border-t odd:bg-white cursor-pointer hover:border-gray-100">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {product.productTitle}
                        </th>
                        <td className="px-6 py-4">
                            {product.price}
                        </td>
                        <td className="px-6 py-4 text-xs">
                            {product.productCategory}
                        </td>
                    </tr>
                ))}

                    </tbody>
                </table>
            </div>
        
        {/* SHOPPING CART */}
          <div className={`${isCartVisible ? 'block' : 'hidden'} mt-32 h-4/6 md:block fixed top-0 right-0 w-full h-full md:w-2/5 lg:w-1.5/5 bg-white shadow-lg`}>
           <div className="bg-gray-50 px-4 relative h-full overflow-y-scroll">
          
          {/* Close Button */}
          <div className="flex justify-end">
            <button 
              onClick={() => setIsCartVisible(false)} 
              className="h-10 w-10 bg-black text-white flex items-center justify-center md:hidden"
            >
              x
            </button>
          </div>

          {/* Cart Items */}
          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <p className='text-lg'>Cart is empty</p>
            ) : (
            cartItems.map((item) => (
                <div key={item.itemId} className="card my-1 rounded bg-gray-100 p-2">
                <div className="flex items-center gap-2">
                    <div className='text-sm flex items-center gap-2'>
                        <input
                            type="number"
                            defaultValue={item.qty}
                            className='w-12 h-10 p-1 rounded border border outline-none'
                            onChange={(e) => handleQuantityChange(item.itemId, parseInt(e.target.value, 10))}
                            
                        />
                            <span>{item.description}</span>
                        
                        <span>{item.productTitle}</span>
                    </div>
                    <div className='text-sm text-black rounded p-1 bg-gray-200 mx-2'>{item.price} </div>
                    <div className='text-sm text-black p-1 rounded bg-gray-200'>{item.subTotal} </div>
                </div>
                <div className="flex justify-end items-center">
                    <button 
                    onClick={() => deleteItem(item.itemId)} 
                    className='text-xs font-semibold p-2 mr-2 text-pink-800'
                    >
                    Remove
                    </button>
                </div>
                </div>
            ))
            )}
            
            {/* Total Section */}
            <div className="border-t mt-2 p-2">
                <p className='flex justify-between items-center'>
                    <span className='font-bold'>Total</span>
                    <span>₦{cartTotal}</span>
                </p>
                <div className="w-full bg-gray-100 rounded p-2">
                    <label htmlFor="" className='block text-sm font-light'>Paid</label>
                    <input type="number" onChange={(e) => setAmountPaid(e.target.value)} className='w-full my-2 border p-1 border-gray-800 outline-none focus:border-pink-950 text-sm' value={amountPaid} placeholder='Amount Paid'/>
                </div>
                {cartItems.length !== 0 && (
                    <>
                        <div className="mt-2 border-t">
                            <p>
                                 <label htmlFor="payment-method" className='text-sm font-light'>Payment Method</label>
                                <select onChange={(e) => setPaymentMethod(e.target.value)} id="payment-method"  className='w-full mt-1 border p-2 rounded'>
                                    <option value="CASH" selected>CASH</option>
                                    <option value="TRANSFER">TRANSFER</option>
                                    <option value="CARD">CARD</option>
                                    <option value="NOT PAID">NOT PAID</option>
                                </select>
                            </p>
                           
                        </div>
                        <input type="text" onChange={(e) => setCustomerName(e.target.value)} value={customerName} className='w-full my-2 border p-2 border-pink-800 outline-none focus:border-pink-950 text-sm' placeholder='customer name'/>
                        <button onClick={() => procesCart()} className='bg-gray-950 text-white p-3 text-sm mt-4 w-full '>Complete</button>
                    </>
                )}
                
            </div>
            </div>
        </div>
            {/* SHOPPING CART */}
            
        </div>
      </section>

    </>
  )
}

export default ShopNow