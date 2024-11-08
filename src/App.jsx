
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import CreateProduct from './pages/CreateProduct'
import ProductsTable from './pages/ProductsTable'


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
            
            
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
