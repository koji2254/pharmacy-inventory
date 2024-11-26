import React, { useEffect, useState } from 'react';

const SingleProductCard = ({ closeSingleProduct, addProductToCart, product }) => {
  const { productId, productTitle, price, packetPrice, cartonPrice } = product;

  const [activeProduct, setActiveProduct] = useState(null)
  const [activeDescription, setActiveDescription] = useState('pcs')
  const [activeQty, setActiveQty] = useState(1)
  const [activePrice, setActivePrice] = useState(price)

  const [pcsQty, setPcsQty] = useState(1);
  const [packetQty, setPacketQty] = useState(0);
  const [cartonQty, setCartonQty] = useState(0);

  const [pcsSubtotal, setPcsSubtotal] = useState(price);
  const [packetSubtotal, setPacketSubtotal] = useState(0);
  const [cartonSubtotal, setCartonSubtotal] = useState(0);

  const [total, setTotal] = useState(price * 1);

  const onChangeQty = (type, value) => {
    value = parseInt(value) || 0; // Ensure value is a number or default to 0
  
    // Prevent negative values
    if (value <= 0) {
      value = 1;
    }

    if (type === 'pcs') {
      setPcsQty(value);
      setPcsSubtotal(value * price);

      const subtotal = (value * price)
      setTotal(subtotal)

      setActiveDescription('pcs')
      setActivePrice(price)
      setActiveQty(value)

      
      setPacketQty(0);
      setCartonQty(0);
      setPacketSubtotal(0);
      setCartonSubtotal(0);

      // -------------------
      
      // Calculate the total considering all categories
     setTotal(price * value);
      // -------------------
    } else if (type === 'packet') {
      setPacketQty(value);
      setPacketSubtotal(value * packetPrice);

      setActiveDescription('packet')
      setActivePrice(packetPrice)
      setActiveQty(value)

      // Calculate the total considering all categories
    setTotal(packetPrice * value);
         // -------------------
         setPcsQty(0);
         setCartonQty(0);
         setCartonSubtotal(0);
         setPcsSubtotal(0);
   
         // -------------------

    } else if (type === 'carton') {
      setCartonQty(value);
      setCartonSubtotal(value * cartonPrice);

      setActiveDescription('carton')
      setActivePrice(cartonPrice)
      setActiveQty(value)

      // Calculate the total considering all categories
    setTotal(cartonPrice * value);
         // -------------------
         setPacketQty(0);
         setPcsQty(0);
         setPacketSubtotal(0);
         setPcsSubtotal(0);
         
         // -------------------
    }
  
    // Calculate the total considering all categories
    setTotal(activePrice * value);
  };

  useEffect(() => {
    console.log(total)

  }, [pcsQty, packetQty, cartonQty, total])
  
  const handleAddToCart = () => {
    const productOrder = {
      productId,
      description: activeDescription,
      qty: activeQty,
      price: activePrice,
      subTotal: activePrice * activeQty,
      productTitle
    };

    if((productOrder.qyt <= 0) || (productOrder.subTotal === 0)){
      return alert('Pls select a valid parameters')
    }

    addProductToCart(productOrder);
  };

  return (
    <div className="single-product-card">
      <div className="single-product-body w-11/12 md:w-8/12">
        <div className="text-left w-full py-2">
          <p className="text-bold border-b p-1 w-full text-xl bg-gray-300 rounded">{productTitle}</p>
          
          {/* PCS */}
          <div className="flex justify-between border-b p-1 items-center text-sm">
            <p className="text-bold">
              <span className="text-gray-600"><span name='description'></span>Price: </span>{price}
            </p>
            <p className="flex items-center">
              <input
                type="number"
                name="pcsQty"
                className="border border-pink-900 p-1 rounded w-16"
                value={pcsQty}
                onChange={(e) => onChangeQty('pcs', e.target.value)}
              />
              <span readOnly className="border-b ml-1 bg-gray-300 rounded p-1 w-16">
                {pcsSubtotal}
              </span>
            </p>
          </div>
          
          {/* PACKET */}
          <div className="flex justify-between border-b p-1 items-center text-sm">
            <p className="text-bold">
              <span className="text-gray-600"><span name='description'>Packet</span> Price: </span>{packetPrice}
            </p>
            <p className="flex items-center">
              <input
                type="number"
                name="packetQty"
                className="border border-pink-900 p-1 rounded w-16"
                value={packetQty}
                onChange={(e) => onChangeQty('packet', e.target.value)}
              />
              <span readOnly className="border-b ml-1 bg-gray-300 rounded p-1 w-16">
                {packetSubtotal}
              </span>
            </p>
          </div>
          
          {/* CARTON */}
          <div className="flex justify-between border-b p-1 items-center text-sm">
            <p className="text-bold">
              <span className="text-gray-600"><span name='description'>Carton</span> Price: </span>{cartonPrice}
            </p>
            <p className="flex items-center">
              <input
                type="number"
                name="cartonQty"
                className="border border-pink-900 p-1 rounded w-16"
                value={cartonQty}
                onChange={(e) => onChangeQty('carton', e.target.value)}
              />
              <span readOnly className="border-b ml-1 bg-gray-300 rounded p-1 w-16">
                {cartonSubtotal}
              </span>
            </p>
          </div>
          
          {/* TOTAL */}
          <div className="flex justify-between border-b p-1 items-center text-sm">
            <p className="text-bold">
              <span className="text-gray-600">TOTAL PRICE: </span>
            </p>
            <input
              readOnly
              type="number"
              name="total"
              className="border border-pink-900 p-2 font-bold rounded w-20"
              value={total}
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="cta flex gap-2 items-center w-full">
          <button
            onClick={handleAddToCart}
            className="bg-pink-900 w-full flex justify-center gap-2 items-center text-sm text-white p-2 border-none rounded hover:bg-pink-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Cart
          </button>
          <button
            onClick={closeSingleProduct}
            className="border border-pink-950 w-full flex justify-center gap-2 items-center text-sm text-pink-900 p-2 border-none rounded hover:bg-pink-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
