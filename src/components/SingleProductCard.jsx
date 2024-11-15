import React, { useState } from 'react';

const SingleProductCard = ({ closeSingleProduct, addProductToCart, product }) => {
  const { productId, productTitle, price, packetPrice, cartonPrice } = product;

  const [pcsQty, setPcsQty] = useState(0);
  const [packetQty, setPacketQty] = useState(0);
  const [cartonQty, setCartonQty] = useState(0);

  const [pcsSubtotal, setPcsSubtotal] = useState(0);
  const [packetSubtotal, setPacketSubtotal] = useState(0);
  const [cartonSubtotal, setCartonSubtotal] = useState(0);

  const [total, setTotal] = useState(0);

  const onChangeQty = (type, value) => {
    value = parseInt(value) || 0; // Ensure value is a number or default to 0
  
    if (type === 'pcs') {
      setPcsQty(value);
      setPcsSubtotal(value * price);
    } else if (type === 'packet') {
      setPacketQty(value);
      setPacketSubtotal(value * packetPrice);
    } else if (type === 'carton') {
      setCartonQty(value);
      setCartonSubtotal(value * cartonPrice);
    }
  
    // Calculate the total considering all categories
    setTotal(
      (type === 'pcs' ? value * price : pcsQty * price) +
      (type === 'packet' ? value * packetPrice : packetQty * packetPrice) +
      (type === 'carton' ? value * cartonPrice : cartonQty * cartonPrice)
    );
  };
  
  const handleAddToCart = () => {
    const productOrder = {
      productId,
      productTitle,
      pcsQty,
      pcsSubtotal,
      packetQty,
      packetSubtotal,
      cartonQty,
      cartonSubtotal,
      total,
    };
    
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
              <span className="text-gray-600">Price: </span>{price}
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
              <span className="text-gray-600">Packet Price: </span>{packetPrice}
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
              <span className="text-gray-600">Carton Price: </span>{cartonPrice}
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
