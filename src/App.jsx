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
import IndividualRating from './pages/IndividualRating';
import SoftwareReviews from './pages/SoftwareReviews';
import GetSoftwareCompanyDemo from './pages/GetSoftwareCompanyDemo';
import Specifications from './pages/Specifications';
import Dropdwonindividual from './pages/Dropdwonindividual';
import Dashboard from './pages/Dashboard';
import QuickSmartReview from './pages/QuickSmartReview';
import QuickSmartFeature from './pages/QuickSmartFeature';
import QuickSmartRating from './pages/QuickSmartRating';
import QuickSmartSpecification from './pages/QuickSmartSpecification';
import QuickGetSoftwareCompanyDemo from './pages/QuickGetSoftwareCompanyDemo';
import QuickDropdwon from './pages/QuickDropdwon';
import ScogoReview from './pages/ScogoReview';
import ScogoFeature from './pages/ScogoFeature';
import ScogoRating from './pages/ScogoRating';
import ScogoSpecification from './pages/ScogoSpecification';
import ScogoGetSoftwareCompanyDemo from './pages/ScogoGetSoftwareCompanyDemo';
import ScogoDropdwon from './pages/ScogoDropdwon';
import LowtouchReview from './pages/LowtouchReview';
import LowtouchFeature from './pages/LowtouchFeature';
import LowtouchRating from './pages/LowtouchRating';
import LowtouchSpecification from './pages/LowtouchSpecification';
import LowtouchGetSoftwareCompanyDemo from './pages/LowtouchGetSoftwareCompanyDemo';
import LowtouchDropdwon from './pages/LowtouchDropdwon';
import InVideoReview from './pages/InVideoReview';
import InVideoFeature from './pages/InVideoFeature';
import InVideoRating from './pages/InVideoRating';
import InVideoSpecification from './pages/InVideoSpecification';
import InVideoSoftwareRevies from './pages/InVideoSoftwareReviews';
import InVideoSoftwareCompanyDemo from './pages/InVideoGetSoftwareCompanyDemo';
import InVideoDropdown from './pages/InVideoDropdown';
import ZrikaReview from './pages/ZrikaReview';
import ZrikaFeature from './pages/ZrikaFeature';
import ZrikaRating from './pages/ZrikaRating';
import ZrikaSpecification from './pages/ZrikaSpecification';
import ZrikaSoftwareReviews from './pages/ZrikaSoftwareReviews';
import ZrikaGetSoftwareCompanyDemo from './pages/ZrikaGetSoftwareCompanyDemo';
import ZrikaDropdown from './pages/ZrikaDropdown';
import HiavaReaview from './pages/HiavaReview';
import HiavaFeature from './pages/HiavaFeature';
import HiavaRating from './pages/HiavaRating';
import HiavaSpecification from './pages/HiavaSpecification';
import HiavaSoftwareReviews from './pages/HiavaSoftwareReviews';
import HiavaGetSoftwareCompanyDemo from './pages/HiavaGetSoftwareCompanyDemo';
import HiavaDropdown from './pages/HiavaDropdown';
import AmmplifyReview from './pages/AmmplifyReview';
import AmmplifyFeature from './pages/AmmplifyFeature';
import AmmplifyRating from './pages/AmmplifyRating';
import AmmplifySpecification from './pages/AmmplifySpecification';
import AmmplifySoftwareReviews from './pages/AmmplifySoftwareReviews';
import AmmplifyGetSoftwareCompanyDemo from './pages/AmmplifyGetSoftwareCompanyDemo';
import AmmplifyDropdown from './pages/AmmplifyDropdown';




import NapkinReview from './pages/NapkinReview';
import NapkinFeature from './pages/NapkinFeature';
import NapkinRating from './pages/NapkinRating';
import NapkinSpecification from './pages/NapkinSpecification';
import NapkinGetSoftwareCompanyDemo from './pages/NapkinGetSoftwareCompanyDemo';
import NapkinDropdwon from './pages/NapkinDropdwon';
import NapkinSoftwareReviews from './pages/NapkinSoftwareReviews';

import CaptionReview from './pages/CaptionReview';
import CaptionFeature from './pages/CaptionFeature';
import CaptionRating from './pages/CaptionRating';
import CaptionSpecification from './pages/CaptionSpecification'; 
import CaptionGetSoftwareCompanyDemo from './pages/CaptionGetSoftwareCompanyDemo';
import CaptionDropdwon from './pages/CaptionDropdwon';

import FeaturedCategories from './pages/FeaturedCategories';
import ConversationBot from './pages/ConversationBot';
import SalesAutomation from './pages/SalesAutomation';
import DocumentationAi from './pages/DocumentationAi';




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
            <Route path="quick-smart-review" element={<QuickSmartReview />} />
            <Route path="quick-smart-feature" element={<QuickSmartFeature />} />
            <Route path="quick-smart-rating" element={<QuickSmartRating />} />
            <Route path="quick-smart-specification" element={<QuickSmartSpecification />} />
            <Route path="quick-smart-softwarecompanydemo" element={<QuickGetSoftwareCompanyDemo />} />
            <Route path="quick-smart-quickdropdwon" element={<QuickDropdwon />} />
            <Route path="scogo-review" element={<ScogoReview />} />
            <Route path="scogo-feature" element={<ScogoFeature />} />
            <Route path="scogo-rating" element={<ScogoRating />} />
            <Route path="scogo-specification" element={<ScogoSpecification />} />
            <Route path="scogo-softwarecompanydemo" element={<ScogoGetSoftwareCompanyDemo />} />
            <Route path="scogo-dropdwon" element={<ScogoDropdwon />} />
            <Route path="lowtouch-review" element={<LowtouchReview />} />
            <Route path="lowtouch-feature" element={<LowtouchFeature />} />
            <Route path="lowtouch-rating" element={<LowtouchRating />} />
            <Route path="lowtouch-specificating" element={<LowtouchSpecification />} />
            <Route path="lowtouch-softwarecompanydemo" element={<LowtouchGetSoftwareCompanyDemo />} />
            <Route path="lowtouch-dropdwon" element={<LowtouchDropdwon />} />
            
            <Route path="napkin-review" element={<NapkinReview />} />
            <Route path="napkin-feature" element={<NapkinFeature />} />
            <Route path="napkin-rating" element={<NapkinRating />} />
            <Route path="napkin-specification" element={<NapkinSpecification />} />
            <Route path="napkin-softwarecompanydemo" element={<NapkinGetSoftwareCompanyDemo />} />
            <Route path="napkin-dropdwon" element={<NapkinDropdwon /> } />
            <Route path="napkin-software-reviews" element={<NapkinSoftwareReviews />} />
            

            <Route path="caption-review" element={<CaptionReview />} />
            <Route path='caption-feature' element={<CaptionFeature />} />
            <Route path='caption-rating' element={<CaptionRating />} />
            <Route path='caption-specifitication' element={<CaptionSpecification />} />
            <Route path='caption-softwarereave' element={<Caption-software />} />
            <Route path='Captioncompanydemo' element={<CaptionGetSoftwareCompanyDemo />} />
            <Route path='caption-dropdwon' element={<CaptionDropdwon />} />

            <Route path='invideo-review' element={<InVideoReview />} />
            <Route path='invideo-feature' element={<InVideoFeature />} />
            <Route path='invideo-rating' element={<InVideoRating />} />
            <Route path='invideo-specification' element={<InVideoSpecification />} />
            <Route path='invideo-softwarereaview' element={<InVideoSoftwareRevies />} />
            <Route path='invideo-softwarecompanydemo' element={<InVideoSoftwareCompanyDemo />} />
            <Route path='invideo-dropdwon' element={<InVideoDropdown />} />
            <Route path='zrika-review' element={<ZrikaReview />} />
            <Route path='zrika-feature' element={<ZrikaFeature />} />
            <Route path='zrika-rating' element={<ZrikaRating />} />
            <Route path='zrika-Specification' element={<ZrikaSpecification />} />
            <Route path='zrika-softwarereview' element={<ZrikaSoftwareReviews />} />
            <Route path='zrika-softwarecompanydemo' element={<ZrikaGetSoftwareCompanyDemo />} />
            <Route path='zrika-dropdown' element={<ZrikaDropdown />} /> 
            <Route path='hiava-review' element={<HiavaReaview />} />
            <Route path='hiava-feature' element={<HiavaFeature />} />
            <Route path='hiava-rating' element={<HiavaRating />} />
            <Route path='hiava-specification' element={<HiavaSpecification/>} />
            <Route path='hiava-software-review' element={<HiavaSoftwareReviews />} />
            <Route path='hiava-getsoftwarecompanydemo' element={<HiavaGetSoftwareCompanyDemo />} />
            <Route path='hiava-dropdown' element={<HiavaDropdown />} />
            <Route path='ammplify-review' element={<AmmplifyReview />} />
            <Route path='ammplify-Feature' element={<AmmplifyFeature />} />
            <Route path='ammplify-rating' element={<AmmplifyRating />} />
            <Route path='ammplify-specification' element={<AmmplifySpecification />} />
            <Route path='ammplify-software-review' element={<AmmplifySoftwareReviews />} />
            <Route path='ammplify-getsoftwarecompanydemo' element={<AmmplifyGetSoftwareCompanyDemo />} />
            <Route path='ammplify-dropdown' element={<AmmplifyDropdown />} />
            <Route path='featured-categories'element={<FeaturedCategories />} />
            <Route path='conversation-bot'element={<ConversationBot />} />
            <Route path='sale-automation'element={<SalesAutomation />} />
            <Route path='documentation-ai'element={<DocumentationAi />} />




            
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