
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import CreateProduct from './pages/CreateProduct'
import ProductsTable from './pages/ProductsTable'
import EditProduct from './pages/EditProduct';
import ShopNow from './pages/ShopNow';
import Expenses from './pages/Expenses';
import Footer from './components/Footer';
import HistoryPage from './pages/HistoryPage';
import SingleHistoryPage from './pages/SingleHistoryPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products-table" element={<ProductsTable />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/shop-now" element={<ShopNow />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/history/:cartId" element={<SingleHistoryPage />} />
          
            
          </Routes>
            
            <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
