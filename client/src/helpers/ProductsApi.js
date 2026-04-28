const Backendurl=import.meta.env.VITE_BACKEND_URL
import api from '@/api/apiInstance';

export const fetchProducts = async (skip,limit) => {
    try {
      const res = await api.get(
        `${Backendurl}/getproducts?skip=${skip}&limit=${limit}`
      );
      console.log(res)
      return res.data;
    } catch (e) {
      console.error("Failed to fetch products:", e);
      throw(e);
    }
  };

  