import { useState, useEffect, useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChefHat } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

import Breadcrumb from '../components/common/Breadcrumb';
import QuantitySelector from '../components/cart/QuantitySelector';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import axios from 'axios';
import { UserContext } from '../components/UserContext';
export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedShape, setSelectedShape] = useState(null);
  const [cart, setCart]= useState([])

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);



useEffect(() => {
  setLoading(true);

  axios.get("http://localhost:8000/api/csrf/", {
    withCredentials: true
  })
  .then(() => {
    const csrfToken = getCookie("csrftoken");

    return axios.get(
      `http://localhost:8000/api/products/${slug}/`,
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrfToken
        }
      }
    );
  })
  .then((response) => {
    setProduct(response.data);
  })
  .catch((error) => {
    console.error("Error fetching product:", error);
    setProduct(null);
  })
  .finally(() => {
    setLoading(false);
  });

}, [slug]);

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex flex-col products-center justify-center px-4">
        <h1 className="font-heading text-2xl mb-4">Product Not Found</h1>
        <Button to="/shop" variant="outline">Back to Shop</Button>
      </div>
    );
  }
  const getCookie = (name) => {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split("=");

    if (key === name) {
      return decodeURIComponent(value);
    }
  }

  return null;
};
const csrfToken = getCookie("csrftoken");
const {token}= useContext(UserContext);
  const handleFormSubmit = async(e)=> {
    e.preventDefault();
 
    addItem(product, quantity, selectedShape);
    openCart();
}

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="px-4 md:px-8 lg:px-12 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="aspect-square overflow-hidden bg-platinum">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                fetchpriority="high"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            <div className="flex products-center gap-3 mb-2">
              <span className="text-xs uppercase tracking-wider text-gold font-medium capitalize">
                {product.pasta_type}
              </span>
              <span className="text-platinum">|</span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground capitalize">
                {product.ingredient?.replace(/-/g, ' ')}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-medium mb-2">
              {product.name}
            </h1>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              {product.pack_size}
            </p>
            <p className="text-2xl font-heading font-medium mb-6">
              {product.price}
            </p>

            <p className="text-sm leading-relaxed text-foreground/80 mb-6">
              {product.description}
            </p>

           
            {/* Cooking Time */}
            {product.cooking_time && (
              <div className="flex products-center gap-2 mb-2 text-sm">
                <Clock size={16} className="text-gold" />
                <span className="text-muted-foreground">Cooking time:</span>
                <span>{product.cooking_time}</span>
              </div>
            )}

            {/* Suggested Dishes */}
            {product.suggested_dishes && product.suggested_dishes.length > 0 && (
              <div className="mb-8">
                <div className="flex products-center gap-2 mb-2 text-sm">
                  <ChefHat size={16} className="text-gold" />
                  <span className="text-muted-foreground">Suggested dishes:</span>
                </div>
                <ul className="text-sm space-y-1 pl-6 list-disc">
                  {product.suggested_dishes.map((dish) => (
                    <li key={dish}>{dish}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="mt-auto pt-2 border-t border-platinum lg:mt-2">
              <div className="flex flex-col sm:flex-row products-start sm:products-center gap-2">
                <QuantitySelector
                  initial={1}
                  onChange={setQuantity}
                  price={product.price}
                />
                <Button onClick={handleFormSubmit} size="sm" className="flex-1 sm:flex-none">
                  Add to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}