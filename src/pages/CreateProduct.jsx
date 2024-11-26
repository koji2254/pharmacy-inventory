import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import CenterAlert from '../components/CenterAlert'
import Spinner from '../components/Spinner'
import LoadingBtn from '../components/LoadingBtn'
import { API_BASE_URL } from '../assets/Proxy'

const CreateProduct = () => {

  const [loading, setLaoding] = useState(false)
  const [alertMessage, setAlertMessage] = useState(null)

  const [productImage, setProductImage] = useState(null)
  const [productTitle, setProductTitle] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [price, setPrice] = useState('')
  const [packetPrice, setPacketPrice] = useState('')
  const [cartonPrice, setCartonPrice] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [expiryDate, setExpiryDate] = useState('')


  useEffect(() => {

    if(alertMessage !== null){
      setTimeout(() => {
        setAlertMessage(null)
      }, 2000)
    }

  },[alertMessage])

  const handleImageChange = (e) => setProductImage(e.target.files[0])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('productImage', productImage)
    formData.append('productTitle', productTitle)
    formData.append('productCategory', productCategory)
    formData.append('price', price)
    formData.append('packetPrice', packetPrice)
    formData.append('cartonPrice', cartonPrice)
    formData.append('quantity', quantity)
    formData.append('expiryDate', expiryDate)

    formData.forEach((index, item) => {
        console.log(`${index} : ${item}`)
    })

    setLaoding(true)
    axios.post(`${API_BASE_URL}/product/add`, formData, {
      headers: {
        'Content-Type' : 'multipart/from-data',
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      console.log(response)
      const message = response.data.message
      setAlertMessage({message, type:'good'})

      // reset all states to null 
      setProductImage(null)
      setProductTitle('')
      setProductCategory('')
      setPrice(0)
      setPacketPrice(0)
      setCartonPrice(0)
      setQuantity(0)
      setExpiryDate(null)

    })
    .catch((error) => {
      console.log(error.response.data.message)
      const message = error.response.data.message
      setAlertMessage({message, type:'bad'})
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
      <section className='w-full p-2'>
        <div className="mt-2 w-full md:w-8/12">  {/*  */}
            <div className="text-md font-light px-3 border-b mb-2 py-2 flex items-center gap-2">
                <NavLink to='/products-table'>
                    <p>Products Table </p>
                </NavLink>
                <span>/</span>
                <NavLink to='/products-table'>
                    <p className='font-normal text-pink-800'>Create Product</p>
                </NavLink>
            </div>
            {/*  */}
          <form className='p-2 mt-2 border w-full' onSubmit={handleSubmit}>
            <div className="b-t">
              <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-image">Product Image</label>
              <input type="file" className='p-2 rounded outline-none border w-full border-gray-200' onChange={handleImageChange} />
            </div>
            <div className="mt-3">
              <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-title">Product Title</label>
              <input type="text" className='p-2 rounded outline-none border w-full border-gray-200' value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />
            </div>
            <div className="mt-2 flex items-center">
              <div className="b-t w-full">
                <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-category">Product Category</label>
                <select className='p-2 rounded outline-none border w-full border-blue-800' value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                  <option value="">Select Product Category</option>
                  <option value="Pills">Pills</option>
                  <option value="Gray Drugs">Gray Drugs</option>
                  <option value="Advanced Weed">Advanced Weed</option>
                </select>
              </div>
            </div>
            <div className="flex mt-2 gap-2 items-center">
              <div className="b-t w-full">
                <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="price">Price</label>
                <input type="text" className='p-2 rounded outline-none border w-full border-gray-200' value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="b-t w-full">
                <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="packet-price">Packet Price</label>
                <input type="text" className='p-2 rounded outline-none border w-full border-gray-200' value={packetPrice} onChange={(e) => setPacketPrice(e.target.value)} />
              </div>
              <div className="b-t w-full">
                <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="carton-price">Carton Price</label>
                <input type="text" className='p-2 rounded outline-none border w-full border-gray-200' value={cartonPrice} onChange={(e) => setCartonPrice(e.target.value)} />
              </div>
            </div>
            <div className="mt-2">
              <div className="b-t">
                <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="quantity">Quantity</label>
                <input type="number" className='p-2 rounded outline-none border w-full border-gray-200' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className="b-t">
                <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="expiry-date">Expiry Date</label>
                <input type="date" className='p-2 rounded outline-none border w-full border-gray-200' value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className='w-full p-2 bg-gray-200 text-blue-900 roboto border border-blue-900 text-sm rounded hover:bg-gray-300'>
                {loading ? <LoadingBtn /> : 'Upload Product'}
                
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default CreateProduct
