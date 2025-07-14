import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { DataProvider } from './context/DataContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/Users';
import AdminBooks from './pages/Admin/Books';
import AdminOrders from './pages/Admin/Orders';
import AdminCategories from './pages/Admin/Categories';
import AdminReports from './pages/Admin/Reports';
import ProtectedRoute from './components/common/ProtectedRoute';
import TopBar from './components/common/TopBar';
import SideBar from './components/common/SideBar';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <AuthProvider>
      <CartProvider>
        <DataProvider>
    <Router>
            <TopBar />
            <div style={{ display: 'flex' }}>
              {isAdminRoute && <SideBar />}
              <div style={{ flex: 1, marginLeft: isAdminRoute ? 220 : 0, padding: '2rem 1rem' }}>
          <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/books/:id" element={<BookDetails />} />
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />
                  <Route path="/admin/books" element={<ProtectedRoute adminOnly={true}><AdminBooks /></ProtectedRoute>} />
                  <Route path="/admin/orders" element={<ProtectedRoute adminOnly={true}><AdminOrders /></ProtectedRoute>} />
                  <Route path="/admin/categories" element={<ProtectedRoute adminOnly={true}><AdminCategories /></ProtectedRoute>} />
                  <Route path="/admin/reports" element={<ProtectedRoute adminOnly={true}><AdminReports /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
          </Routes>
              </div>
      </div>
    </Router>
        </DataProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
