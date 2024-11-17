import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../assets/Proxy'
import Spinner from '../components/Spinner'
import CenterAlert from '../components/CenterAlert'

const EditProduct = () => {
  const navigate = useNavigate()

  const params = useParams()
  const productId = params.id

  const [loading, setLoading] = useState(false)
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

    // GET THE SINGLE PRODUCTS USING THE PRODUCTS ID
    setLoading(true)
    axios.get(`${API_BASE_URL}/product/${productId}`)
      .then((response) => {
        const product = response.data.product

        setProductTitle(product.productTitle)
        setProductCategory(product.productCategory)
        setPrice(product.price)
        setPacketPrice(product.packetPrice)
        setCartonPrice(product.cartonPrice)
        setQuantity(product.quantity)
        setExpiryDate(product.expiryDate)
        setProductImage(product.productImage)

      })
      .catch((error) => {
        console.log(error.response?.data?.message || 'Error loading product')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [productId])


    useEffect(() => {

      if(alertMessage !== null){
        setTimeout(() => {
          setAlertMessage(null)
        }, 2000)
      }

    },[alertMessage])

    

  const handleImageChange = (e) => setProductImage(e.target.files[0])


  // HADLE THE FORM SUBMITION
  const submitUpdate = (e) => {
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
    formData.append('productId', productId)

      setLoading(true)
      axios.post(`${API_BASE_URL}/product/update-product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response)
        const status = response.data.status;
        const message = response.data.message;
        setAlertMessage({message, type:'good' })

        const product = response.data.product

        setProductTitle(product.productTitle)
        setProductCategory(product.productCategory)
        setPrice(product.price)
        setPacketPrice(product.packetPrice)
        setCartonPrice(product.cartonPrice)
        setQuantity(product.quantity)
        setExpiryDate(product.expiryDate)
        setProductImage(product.productImage)

      })
    .catch((error) => {
      console.error('Error updating product:', error.response?.data?.message || error)
      
    })
    .finally(() => {
      setLoading(false)
    })


  }





  const deleteProduct = (e) => {
      e.preventDefault();
  
      if (!window.confirm('Are you sure you want to delete this product?')) {
          return;
      }
  
      setLoading(true)
      axios.delete(`${API_BASE_URL}/product/${productId}`, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      })
      .then((response) => {
          console.log(response);
          const status = response.data.status;
          const message = response.data.message;
          setAlertMessage({message, type:'good' })
  
          if (status === true) {
            setTimeout(() => {
              navigate('/products-table');
            }, 2200)
              
          }
      })
      .catch((error) => {
          console.log(error.response);
      })
      .finally(() => {
        setLoading(false)
      })
  };
  
  return (
    <>
      <NavBar />

      {alertMessage && <CenterAlert type={alertMessage.type} text={alertMessage.message} />}
      {loading && <Spinner />}
      <section className='w-full p-2'>
        <div className="w-full md:w-8/12">
          <div className="flex gap-2 items-center border-b py-2">
            <button className='text-xs font-bold border p-1 rounded'>
              <NavLink to='/products-table' className='flex items-center'>BACK</NavLink>
            </button>
            <h3 className='text-blue-900 font-bold text-md roboto'>Edit PRODUCT <span className='border p-1 text-gray-500'># {productId}</span></h3>
          </div> 

          <div className="img-cont h-36 border border-gray-900">
            <img src={productImage} alt="Product img"  className='w-full h-full object-contain' />
          </div>
          <form className='p-2 mt-2 border w-full'>
            <div className="b-t">
              <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-image">Product Image</label>
              <input type="file" className='p-2 rounded outline-none border w-full border-gray-200' onChange={handleImageChange} />
            </div>
            <div className="mt-3">
              <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-title">Product Title</label>
              <input type="text" className='p-2 rounded outline-none border w-full border-gray-200' name='productTile' value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />
            </div>
            <div className="mt-2 flex items-center">
              <div className="b-t w-full">
                <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-category">Product Category</label>
                <select name='productCategory'  className='p-2 rounded outline-none border w-full border-blue-800' value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
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
                <input type="text" name='price' className='p-2 rounded outline-none border w-full border-gray-200' value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="b-t w-full">
                <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="packet-price">Packet Price</label>
                <input type="text" name='packetPrice' className='p-2 rounded outline-none border w-full border-gray-200' value={packetPrice} onChange={(e) => setPacketPrice(e.target.value)} />
              </div>
              <div className="b-t w-full">
                <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="carton-price">Carton Price</label>
                <input type="text" name='cartonPrice' className='p-2 rounded outline-none border w-full border-gray-200' value={cartonPrice} onChange={(e) => setCartonPrice(e.target.value)} />
              </div>
            </div>
            <div className="mt-2">
              <div className="b-t">
                <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="quantity">Quantity</label>
                <input name='quantity' type="number" className='p-2 rounded outline-none border w-full border-gray-200' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className="b-t">
                <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="expiry-date">Expiry Date</label>
                <input type="date" name='expiryDate' className='p-2 rounded outline-none border w-full border-gray-200' value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 ">
              <button onClick={(e) => submitUpdate(e)} type="submit" className='w-full p-2 bg-gray-200 text-blue-900 roboto border border-blue-900 text-sm rounded hover:bg-gray-300'>
                Update Product
              </button>
              
            </div>
          </form>
          <button onClick={(e) => deleteProduct(e)} type="button" className='w-full p-2 bg-red-800 text-white roboto border border-blue-900 text-sm rounded hover:bg-gray-300'>
                Delete Product
              </button>
        </div>
      </section>
    </>
  )
}

export default EditProduct
