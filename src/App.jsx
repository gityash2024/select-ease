import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './pages/Footer';
import  Categories from './pages/Categories';
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
function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Product />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/write-feedback" element={<WriteFeedback />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/school" element={<School />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;