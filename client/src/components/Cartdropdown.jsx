import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const CartDropdown = ({ isOpen }) => {  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('https://green-pitch-server-production.up.railway.app/readcart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.data);
      } catch (e) {
        console.error('Could not fetch cart items', e);
      }
    };
    fetchCartItems();
  }, []);

  const removeCart = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`https://green-pitch-server-production.up.railway.app/removecart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (e) {
      console.error('Could not delete item', e);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute right-0 top-10 w-96 bg-white backdrop-blur-md shadow-lg rounded-lg p-4 mt-6 max-h-142 overflow-y-auto z-50"
        >
          {cartItems.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            <div>
              <a className='flex justify-end text-sm text-blue-700 font-semibold' href='/cart'>Review your cart</a>
              <h1 className="font-semibold text-lg mt-2">My Cart</h1>
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center mb-4 border-b pb-2">
                <div>
                  <p className="font-medium">{item.product.brandname}</p>
                  <p className="text-sm text-gray-600">Brand: {item.brand.brandname}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Price: {item.price}</p>
                  <button
                    className="bg-red-600 py-1 px-2 rounded-md mt-2 text-white hover:bg-red-700"
                    onClick={() => removeCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
                <img
                  src={`https://green-pitch-server-production.up.railway.app${item.product.brandimg}`}
                  alt={item.product.brandname}
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            ))}
            </div>)}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDropdown;
