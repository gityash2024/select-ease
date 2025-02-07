import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './pages/Footer';
import Categories from './pages/Categories';
import Product from './pages/Product';
import Review from './pages/Review';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import WriteFeedback from './pages/WriteFeedback';
import Vendor from './pages/Vender';
import School from './pages/School';
import Testimonials from './pages/Testimonials';
import BlogDetails from './pages/BlogDetails';
import ScrollToTop from './components/ScrollToTop';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import { Toaster } from 'react-hot-toast';
import ProductList from './pages/ProductList';
import NotFound from './components/404';
import { useState } from 'react';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const isAdminAuthenticated = () => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    return adminToken && adminUser?.is_admin;
  };

  const ProtectedAdminRoute = ({ children }) => {
    const isAuthenticated = isAdminAuthenticated();
    if (!isAuthenticated) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  const AdminAuthRoute = ({ children }) => {
    const isAuthenticated = isAdminAuthenticated();
    if (isAuthenticated) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/login"
          element={
            <AdminAuthRoute>
              <AdminLogin />
            </AdminAuthRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>

        <Route path="/" element={<><Navbar /><Outlet /><Footer /></>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="categories" element={<School />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="reviews" element={<Review />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog-details" element={<BlogDetails />} />
          <Route path="contact" element={<Contact />} />
          <Route path="write-feedback" element={<WriteFeedback />} />
          <Route path="vendor" element={<Vendor />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      {isLoading && <Loader />}
    </BrowserRouter>
  );
}

export default App;