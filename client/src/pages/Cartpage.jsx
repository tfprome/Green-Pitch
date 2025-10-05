import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const CartPage = () => {
    const navigate=useNavigate()
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = sessionStorage.getItem("token");
                if (!token) return;
                const res = await axios.get("https://green-pitch-server-production.up.railway.app/readcart", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCartItems(res.data.data);
            } catch (e) {
                console.error("Could not fetch cart items", e);
            }
        };
        fetchCartItems();
    }, []);

    const removeFromCart = async (id) => {
        try {
            const token = sessionStorage.getItem("token");
            const res = await axios.delete(
                `https://green-pitch-server-production.up.railway.app/removecart/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (res.status === 200) {
                toast.success("cart Item deleted")
                setCartItems((prev) => prev.filter((item) => item._id !== id));
            }
        } catch (e) {
            console.error("Error removing cart item", e);
        }
    };

    const handleBuyNow =async (id) => {
        try{
            const token=sessionStorage.getItem('token')
            const res=await axios.post(`https://green-pitch-server-production.up.railway.app/createinvoice/${id}`,{},
                {headers:{Authorization:`Bearer ${token}`}})
            if(res.status==200)
            {
                console.log('invoice created',res.data)
                const invoiceID = res.data.invoice._id;
                setCartItems(prev=>prev.filter(item=>item._id!==id))
                toast.success('Invoice created',{autoClose:1000,onClose:()=>navigate(`/invoicepage/${invoiceID}`)}) 
            }
        }
        catch(e){
            console.error('could not create invoice:', e.response?.data || e.message);
        }
        
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-6 bg-gray-200">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex justify-between items-center bg-white shadow-md rounded-xl p-4 mb-4"
                        >
                            {/* Left side: product info */}
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {item.product.brandname}
                                </h3>
                                <p className="text-gray-600">{item.product.branddesc}</p>
                                <div className="flex">
                                    <p className="text-blue-600 font-bold">Price:</p>
                                    <div className="text-blue-600 font-extrabold">৳</div>
                                    <p className="text-blue-600 font-bold">{item.price}</p>
                                </div>

                                <p className="text-bold text-gray-700">
                                    Quantity: {item.quantity} | Size: {item.size}
                                </p>

                                {/* Buttons */}
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(item._id)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>

                            {/* Right side: product image */}
                            <img
                                src={`https://green-pitch-server-production.up.railway.app${item.product.brandimg}`}
                                alt={item.product.brandname}
                                className="w-32 h-32 object-cover rounded-lg"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No cart items</p>
                )}
            </div>
            <Footer className='fixed bottom-0 w-full'/>
        </div>
    );
};

export default CartPage;
