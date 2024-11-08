import React from 'react'
import NavBar from '../components/NavBar'

const CreateProduct = () => {
  return (
    <>
        <NavBar />

        <section className='w-full p-2'>
            <div className="mt-2 w-full md:w-8/12">
                <h3 className='text-blue-900 font-bold text-md roboto'>NEW PRODUCT DETAILS </h3>
                <form className='p-2 mt-2 border w-full' action="">
                    <div className="b-t">
                        <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-title">Product Image</label>
                        <input type="file" className='p-2 rounded outline:none border w-full border-gray-200 ' />
                    </div>
                    <div className="mt-3">
                        <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-title">Product Tiltle</label>
                        <input type="text" className='p-2 rounded outline:none border w-full border-gray-200 ' />
                    </div>
                    <div className="mt-2 flex items-center">
                        <div className="b-t w-full">
                            <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-title">Product Category</label>
                            <select type="text" className='p-2 rounded outline:none border w-full border-blue-800'>
                                <option value="">Select Product Category</option>
                                <option value="">Pills</option>
                                <option value="">Gry Drugs</option>
                                <option value="">Advance Weed</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex mt-2 gap-2 items-center">
                        <div className="b-t w-full">
                            <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-title">Price</label>
                            <input type="text" className='p-2 rounded outline:none border w-full border-gray-200 ' />
                        </div>
                        <div className="b-t w-full">
                            <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-title">Packet Price</label>
                            <input type="text" className='p-2 rounded outline:none border w-full border-gray-200 ' />
                        </div>
                        <div className="b-t w-full">
                            <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-title">Carton Price</label>
                            <input type="text" className='p-2 rounded outline:none border w-full border-gray-200 ' />
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="b-t">
                            <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-title">Quantity</label>
                            <input type="number" className='p-2 rounded outline:none border w-full border-gray-200 ' />
                        </div>
                        <div className="b-t">
                            <label className='roboto text-xs text-gray-600 block font-light my-1' htmlFor="product-title">Expiry Date</label>
                            <input type="date" className='p-2 rounded outline:none border w-full border-gray-200 ' />
                        </div>
                    </div>
                    <div className="mt-3">
                        <button className='w-full p-2 bg-gray-200 text-blue-900 roboto border border-blue-900 text-sm rounded hover:bg-gray-300 hover:'>
                            Upload Product
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </>
  )
}

export default CreateProduct