import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';

export const ProductContext=createContext();

const ProductProvider = ({children}) => {
//products state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: For showing a loading spinner
  const [error, setError] = useState(null);
//fetch products
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Replace with your backend API endpoint
        const response = await axios.get('http://localhost:3500/products');
        console.log(response.data)
        setProducts(response.data);
        console.log('done');
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
  <ProductContext.Provider value={{products}}>
    {children}
  </ProductContext.Provider>);
};

export default ProductProvider;
