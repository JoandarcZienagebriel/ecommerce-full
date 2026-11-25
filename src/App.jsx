
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PageNotFound from './lib/PageNotFound';
import MainLayout from './layouts/MainLayout';
import Cart from './components/cart';
import Total from './components/total';
import Login from './pages/login';
import Sign from './pages/signup';
import { UserProvider } from './components/UserContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import OurMethod from './pages/OurMethod';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
  export default function App() {
  return (
   <UserProvider>
     <Router>
      <Routes>
      <Route element={<MainLayout />}>
       <Route path="/cart" element={<Cart />} />
          <Route path="/total" element={<Total />} />
          <Route path='/login' element={<Login/>}/>
           <Route path='/signup' element={<Sign/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-method" element={<OurMethod />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ordersuccess" element={<OrderSuccess/>} />
      
      </Route>
      <Route path="*" element={<PageNotFound />} />
 </Routes>
    </Router>
   </UserProvider>
  );
}
