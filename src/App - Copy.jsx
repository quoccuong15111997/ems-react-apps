import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';
import "@progress/kendo-theme-default/dist/all.css";
// Import pages
import Dashboard from './pages/Dashboard';
import { Login, OrderList } from './pages';
import { useStateContext } from './context/ContextProvider';
import Logout from './partials/Logout/Logout';
function App() {
  const { userData } = useStateContext();
  return (
    <Router>
      {localStorage.getItem("userData") == null ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/order-customer" element={<OrderList />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
