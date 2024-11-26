import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../assets/Proxy'

import CenterAlert from '../components/CenterAlert'
import Spinner from '../components/Spinner'
import LoadingBtn from '../components/LoadingBtn'



const SingleHistoryPage = () => {useState()

    const [loading, setLaoding] = useState(false)
    const [alertMessage, setAlertMessage] = useState(null)
    const navigate = useNavigate()


    const [items, setItems] = useState([])
    const [historyItem, setHistoryItem] = useState()
    const params = useParams()
    const { cartId } = params

    useEffect(() => {

        if(alertMessage !== null){
          setTimeout(() => {
            setAlertMessage(null)
          }, 2000)
        }
    
      },[alertMessage])



  useEffect(() => {

    const getHistoryItem = () => {
      axios.get(`${API_BASE_URL}/history-cart/${cartId}`)
        .then((response) => {

          setHistoryItem(response.data.cart);
          setItems(response.data.items);

        })
        .catch((error) => {
          console.log(error);
        });
    };

    getHistoryItem();
  }, []);

  const delteInvoice = () => {

    const confirm = window.confirm('Are you sure to delete item')

    if(!confirm){
        return false;
    }

    setLaoding(true)
    axios.delete(`${API_BASE_URL}/delete-invoice/${cartId}`)
    .then((response) => {
        if(response.data.status === true){
            alert('Invoice Deleted')
            navigate('/history')
        }
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
    <NavBar />

    {alertMessage && <CenterAlert type={alertMessage.type} text={alertMessage.message} />}
    {loading && <Spinner />}

    <div className="mt-2">
        <div className="text-md font-light px-3 border-b py-2 flex items-center gap-2">
            <NavLink to='/shop-now'>
                <p>Shop Now </p>
            </NavLink>
            <span>/</span>
            <NavLink to='/history'>
                <p>Sales History</p>
            </NavLink>
            <span>/</span>
            <NavLink to=''>
                <p>{historyItem && historyItem.cartId}</p>
            </NavLink>
        </div>
        <div className="px-3">
            <h1 className='text-bold text-2xl roboto my-2 md:my-4'>Sales Content</h1>
            
        </div>

        <div className="w-full md:w-9/12 px-3">
            <div className="w-full">
                <div className="border w-full p-2 my-1">
                    <div className="w-full flex text-xs lg:text-md items-center justify-between">
                        <p className=' flex items-center'>
                            <span className='text-gray-600'>Total:</span>
                            <span className='text-black px-2'>₦ {historyItem && historyItem.total}</span>
                        </p>
                        <p className=' flex items-center'>
                            <span className='text-gray-600 flex items-center'>status:</span>
                            <span className='text-black px-2'>{historyItem && historyItem.paymentMethod}</span>
                        </p>
                        <p className=' flex items-center'>
                            <span className='text-gray-600 flex items-center'>Name:</span>
                            <span className='text-black px-2'>{historyItem && historyItem.customerName}</span>
                        </p>
                        <p>
                          
                        </p>
                    </div>
                    <p className='bg-gray-100 p-1 rounded text-sm roboto my-2'>date:: 20/20/20</p>
                </div>
                <div className="w-full p-2 my-1 text-sm">
                    <h1 className='text-lg font-light'>INVOICE ITEMS</h1>
                    {items.length > 0 ? items.map((item) => (
                        <div className="w-full my-1 py-2 border-t flex items-center">
                        <p className='flex items-center gap-1'><span>{item.qty}</span> <span>{item.description}</span> <span className='font-light'>{item.productTitle}</span></p>
                        <p className='flex items-center ml-2 bg-gray-100 px-2'>₦{item.price}</p>
                        <p className='flex items-center ml-2 bg-gray-100 px-2'>₦{item.subtotat && item.subtotal}</p>
                    </div>
                )) : <></>}
                </div>
                <div className="w-full flex justify-end">
                    <span className='font-light'>TOTAL</span>
                    <span className='mx-2 font-bold'>₦ {historyItem && historyItem.total}</span>
                </div>
                
                <div className="w-full flex justify-end my-3 gap-3">
                   <button className='hidden mt-3 border border-blue-900 text-sm p-2 rounded text-blue-500' disabled>Edit Invoice</button>
                   <button onClick={() => delteInvoice()} className='mt-3 border border-pink-900 text-sm p-2 rounded text-pink-800'>Delete Invoice</button>
                </div>

            </div>
        </div>

    </div>

</>
  )
}

export default SingleHistoryPage