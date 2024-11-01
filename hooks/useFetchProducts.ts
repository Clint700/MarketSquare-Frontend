import { useEffect, useState } from 'react';
import api from '../services/api';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/product')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};

export default useFetchProducts;