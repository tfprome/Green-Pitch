import React, {useState,useEffect}from 'react';
import axios from 'axios'
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import WishpageSkeleton from '../components/skeleton/wishSkeleton';

const Wishpage = (props) => {
    const [wishitems,setWishItems]=useState([]);
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        const fetchWishItems = async () => {
          try {
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const res = await axios.get('https://green-pitch.onrender.com/readwish', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setWishItems(res.data.data);
          } catch (e) {
            console.error('Could not fetch cart items', e);
          }
          finally{
            setLoading(false)
          }
        };
        fetchWishItems();
      }, []);

      const removeFromWish = async (id) => {
        try {
          const token = sessionStorage.getItem("token");
          const res=await axios.delete(`https://green-pitch.onrender.com/removewish/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if(res.status==200)
            setWishItems((prev) => prev.filter((item) => item._id !== id));
        } catch (e) {
          console.error("Error removing wish item", e);
        }
      };
    
      return (
        <div className='flex flex-col min-h-screen'>
         <Navbar/>
         {loading? <WishpageSkeleton/>:
         <div className="p-6 bg-gray-100 flex-grow">
          {wishitems.length > 0 ? (
            wishitems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white shadow-md rounded-xl p-4 mb-4"
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.product.brandname}</h3>
                  <p className="text-gray-600">{item.product.branddesc}</p>
                  <div className="flex">
                                    <p className="text-blue-600 font-bold">Price:</p>
                                    <div className="text-blue-600 font-extrabold">৳</div>
                                    <p className="text-blue-600 font-bold">{item.product.brandprice}</p>
                                </div>
                  <button
                    onClick={() => removeFromWish(item._id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
    
                {/* Right side: product image */}
                <img
                  src={`https://green-pitch.onrender.com${item.product.brandimg}`}
                  alt={item.product.brandname}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            ))
          ) : (
            <p>No wishlist items</p>
          )}
          </div>}
          <Footer/>
        </div>
      );
};

export default Wishpage;