import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../assets/Proxy';

const HistoryPage = () => {
  const [historyList, setHistoryList] = useState([]); // Full history
  const [filteredHistory, setFilteredHistory] = useState([]); // Filtered history
  const [filter, setFilter] = useState('ALL'); // Current filter state

  useEffect(() => {
    const getHistoryList = () => {
      axios.get(`${API_BASE_URL}/history-list`)
        .then((response) => {
          setHistoryList(response.data.historyList);
          setFilteredHistory(response.data.historyList); // Initialize filtered history
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getHistoryList();
  }, []);

  // Handle filter change
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === 'ALL') {
      setFilteredHistory(historyList); // Show all items
    } else {
      const filteredItems = historyList.filter(item => item.paymentMethod === selectedFilter);
      setFilteredHistory(filteredItems); // Show filtered items
    }
  };

  return (
    <>
      <NavBar />
      <div className="mt-2">
        <div className="text-md font-light px-3 border-b py-2 flex items-center gap-2">
          <NavLink to="/shop-now">
            <p>Shop Now</p>
          </NavLink>
          <span>/</span>
          <p>Sales history</p>
        </div>
        <div className="px-3">
          <h1 className='text-bold text-2xl roboto my-2 md:my-4'>Sales History</h1>
          <div className="flex items-center gap-2">
            <label htmlFor="filter" className='flex items-center gap-1'>
              Filter 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
            </label>
            <select
              className='text-sm border p-1 rounded border-pink-800 my-2'
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="ALL">ALL</option>
              <option value="PAID">PAID</option>
              <option value="NOT PAID">NOT PAID</option>
            </select>
          </div>
        </div>

        <div className="w-full md:w-9/12 px-3">
          <div className="w-full">
            {filteredHistory.length !== 0 ? (
              filteredHistory.map((item) => (
                <div className="border w-full p-2 my-1" key={item.cartId}>
                  <div className="w-full flex items-center justify-between">
                    <p>
                      <span className='text-gray-600'>Total:</span>
                      <span className='text-black px-2'>₦ {item.total}</span>
                    </p>
                    <p>
                      <span className='text-gray-600'>Status:</span>
                      <span className='text-black px-2'>{item.paymentMethod}</span>
                    </p>
                    <p>
                      <NavLink to={`/history/${item.cartId}`}>
                        <button className='text-pink-800'>View</button>
                      </NavLink>
                    </p>
                  </div>
                  <p className='bg-gray-100 p-1 rounded text-sm roboto my-2'>{item.created_at}</p>
                </div>
              ))
            ) : (
              <p className='text-3xl'>No Sales found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
