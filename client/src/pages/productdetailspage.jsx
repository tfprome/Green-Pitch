import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const ProductDetails = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState();
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(1);
    const [selectedSize, setSelectedSize] = useState('medium')

    useEffect(() => {
        const fetchdetails = async () => {
            try {
                const res = await axios.get(`https://green-pitch-server-production.up.railway.app/productdetails/${id}`);
                setDetails(res.data.data);
                setPrice(Number(res.data.data.brandprice) * size * quantity);
            } catch (e) {
                console.error('error after fetching', e);
            }
        }
        fetchdetails();
    }, [id]);

    const ToCart = async () => {
        const Token = sessionStorage.getItem('token')
        //const UserID=sessionStorage.getItem('UserID')
        if (Token) {
            //console.log('hm')
            try {
                const res = await axios.post('https://green-pitch-server-production.up.railway.app/addcart',
                    {
                        ProductID: details._id,
                        size: selectedSize,
                        quantity,
                        price,
                        //UserID
                    },
                    {
                        headers: { Authorization: `Bearer ${Token}` },
                    })
                alert('added to cart')
            }
            catch (e) {
                console.error('couldnt send addcart data to BE', e)
            }
        }

        if (!Token) {
            alert('Login to our site')
            navigate('/login')
        }
    }

    useEffect(() => {
        if (details) {
            setPrice(Number(details.brandprice) * size * quantity);
        }
    }, [size, quantity, details]);

    const handlesize = (selectedSize) => {
        if (!details) return;
        let multiplier = 1;
        if (selectedSize === 'small') multiplier = 0.8;
        if (selectedSize === 'medium') multiplier = 1;
        if (selectedSize === 'large') multiplier = 1.2;
        setSize(multiplier);
        setSelectedSize(selectedSize)
    };

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => quantity > 1 && setQuantity(prev => prev - 1);

    const toWish = async () => {
        try {
            const token = sessionStorage.getItem('token')
            //console.log(token)
            if (!token) {
                alert("Log in our site")
                navigate('/login')
            }
            if (token) {
                const res = await axios.post(`https://green-pitch-server-production.up.railway.app/addwish/${id}`, {},
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                )
                alert('Added to Your Wishlist')
            }

        }
        catch (e) {
            if (e.response && e.response.status === 400) {
                alert("⚠️ This product is already in your wishlist");
            }
            console.error('error sending wish data', e)
        }
    }

    return (
        <div>
            <Navbar />
            <div>
                {details && (
                    <div className='flex flex-col mb-20 lg:flex-row items-start justify-center px-4 lg:px-0'>
                        <div className='w-full lg:w-2/5 mt-10 lg:mt-35 mb-6 lg:mb-0 flex justify-center'>
                            <img
                                src={`https://green-pitch-server-production.up.railway.app${details.brandimg}`}
                                alt="productimage"
                                className='max-w-full h-auto lg:w-[350px] lg:h-[400px]'
                            />
                        </div>
                        <div className='w-full lg:w-3/5 flex flex-col items-center lg:items-start'>
                            <h1 className='w-full text-4xl font-extrabold text-red-700 mt-10 lg:mt-30 text-center lg:text-center'>
                                {details.brandname}
                            </h1>
                            <p className='mt-5 lg:mt-10 text-2xl font-semibold text-center lg:text-left'>
                                {details.branddesc}
                            </p>

                            <div className='mt-5 flex flex-wrap justify-center lg:justify-start'>
                                <button
                                    className='border my-2 mr-2 py-2 px-3 cursor-pointer rounded-md hover:bg-cyan-600'
                                    onClick={() => handlesize('small')}
                                >
                                    Small
                                </button>
                                <button
                                    className='border m-2 py-2 px-3 cursor-pointer rounded-md hover:bg-cyan-600'
                                    onClick={() => handlesize('medium')}
                                >
                                    Medium
                                </button>
                                <button
                                    className='border m-2 py-2 px-3 cursor-pointer rounded-md hover:bg-cyan-600'
                                    onClick={() => handlesize('large')}
                                >
                                    Large
                                </button>
                            </div>

                            <div className='flex mt-5'>
                                <div className='text-red-500 font-extrabold mt-6 text-xl'>৳</div>
                                <div className='mt-5 text-red-500 text-2xl font-semibold'>{price.toFixed(2)}</div>
                            </div>

                            <div className="flex gap-1 mt-5">
                                {Array.from({ length: Number(details.brandstar) }).map((_, index) => (
                                    <Star key={index} size={20} strokeWidth={1.5} className="text-black-500" />
                                ))}
                            </div>

                            <div className="flex items-center gap-4 mt-5">
                                <button
                                    onClick={decrement}
                                    className="border px-3 py-1 rounded-md hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <span className="text-xl font-bold">{quantity}</span>
                                <button
                                    onClick={increment}
                                    className="border px-3 py-1 rounded-md hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>


                            <div className='flex flex-col lg:flex-row w-full gap-2 mt-5'>
                                <button onClick={ToCart}
                                    className='w-full lg:w-1/3 py-2 px-3 cursor-pointer text-white rounded-md bg-green-700 hover:bg-green-900'>
                                    Add to cart
                                </button>
                                <button onClick={toWish}
                                    className='w-full lg:w-1/3 py-2 px-3 cursor-pointer text-white rounded-md bg-gray-700 hover:bg-gray-900'>
                                    Add to wish
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default ProductDetails;
