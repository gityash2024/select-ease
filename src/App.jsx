import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './pages/Footer';
import Categories from './pages/Categories';
import Product from './pages/Product';
import Review from './pages/Review';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import WriteFeedback from './pages/WriteFeedback';
import Vendor from './pages/Vender';
import School from './pages/School';
import Testimonials from './pages/Testimonials';
import BlogDetails from './pages/BlogDetails';
import UserDashboard from './pages/UserDashboard';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Comparison from './pages/Comparison';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ScrollToTop from './components/ScrollToTop';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBlogs from './pages/admin/AdminBlogs';
import { Toaster } from 'react-hot-toast';
import ProductList from './pages/ProductList';
import NotFound from './components/404';
import { useState, useEffect, createContext } from 'react';
import Loader from './components/Loader';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import AuthContext from './context/AuthContext';
import GlobalScrollbarStyles from './components/GlobalScrollbarStyles';
import ProductDetailModal from './pages/ProductDetailModal';
import IndividualReview from './pages/IndividualReview';
import IndividualFeature from './pages/IndividualFeature';
import IndividualRating from './pages/individualRating';
import SoftwareReviews from './pages/SoftwareReviews';
import GetSoftwareCompanyDemo from './pages/GetSoftwareCompanyDemo';
import Specifications from './pages/Specifications';
import Dropdwonindividual from './pages/Dropdwonindividual';
// import IndividaulCompanyName from './pages/IndividaulCompanyName';
import Dashboard from './pages/Dashboard';


// Global scroll to top button
const ScrollTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #026283;
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;

  &:hover {
    background-color: #015272;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(user),
      });
    }
    
    // Add scroll event listener for scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const isAdminAuthenticated = () => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    return adminToken && adminUser?.is_admin;
  };

  const isUserAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return token && user;
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
  
  const ProtectedUserRoute = ({ children }) => {
    const isAuthenticated = isUserAuthenticated();
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  
  // Auth route that redirects to home if already logged in
  const AuthRoute = ({ children }) => {
    const isAuthenticated = isUserAuthenticated();
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const authContextValue = {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    setIsLoading,
    setAuthState
  };

  return (
    <AuthContext.Provider value={authContextValue}>
            <GlobalScrollbarStyles />

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/admin/login"
            element={
              <AdminAuthRoute>
                <AdminLogin setIsLoading={setIsLoading} />
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
            <Route path="blogs" element={<AdminBlogs />} />
          </Route>
          
          {/* Auth Routes - No Navbar/Footer */}
          <Route path="/login" element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          } />
          
          <Route path="/signup" element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          } />

          <Route path="/" element={<><Navbar /><Outlet /><Footer /></>}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/:id" element={<Product />} />
            <Route path="reviews" element={<Review />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blog-details" element={<BlogDetails />} />
            <Route path="blog-details/:id" element={<BlogDetails />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="comparison" element={<Comparison />} />
            <Route path="contact" element={<Contact />} />
            <Route path="write-feedback" element={<WriteFeedback />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product" element={<EditProduct />} />
            <Route path="vendor" element={<Vendor />} />
            <Route path="about-us" element={<Testimonials />} />
            <Route path="product-detail" element={<ProductDetailModal />} />
            <Route path="School" element={<School />} />
            <Route path="individual-review" element={<IndividualReview />} />
            <Route path="individual-feature" element={<IndividualFeature />} />
            <Route path="individual-rating" element={<IndividualRating />} />
            <Route path="software-review" element={<SoftwareReviews />} />
            <Route path="get-software-company-demo" element={<GetSoftwareCompanyDemo />} />
            <Route path="specifications" element={<Specifications />} />
            <Route path="drop-down-individual" element={<Dropdwonindividual />} />
            {/* <Route path="individaul-company-name" element={<IndividaulCompanyName />} /> */}

            
            <Route path="Dashboard" element={<Dashboard />} />
            <Route 
              path="dashboard" 
              element={
                <ProtectedUserRoute>
                  <UserDashboard />
                </ProtectedUserRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        {showScrollTop && (
          <ScrollTopButton
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </ScrollTopButton>
        )}

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
    </AuthContext.Provider>
  );
}

export default App;