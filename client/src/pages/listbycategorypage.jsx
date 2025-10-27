import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import Brandskeleton from './../components/skeleton/brands-skeleton';
import ProductShowSkeleton from '../components/skeleton/products-skeleton';

const Listbyteam = (props) => {
    const { id } = useParams();
    const [products, setproducts] = useState([]);
    const [loading,setLoading]=useState(true)


    useEffect(() => {
        const fetchlistbycategory = async (id) => {
            try {
                const res = await axios.get(`https://green-pitch.onrender.com/listbycategory/${id}`)
                setproducts(res.data.data)
                //console.log(products)
            }
            catch (e) {
                console.log('error sending fetching req in listbybrand', e)
            }
            finally{
                setLoading(false)
            }
        }

        fetchlistbycategory(id);
    }, [id])
    //console.log(products)
    return (

        <div>
            <Navbar />
            {/* <h2 className="text-xl font-bold">Products by category</h2> */}
            {loading?<ProductShowSkeleton count={4}/>:
            (<div className='flex flex-wrap gap-40 justify-center my-10'>
                {products.length > 0 ? (
                    products.map((p) => (
                        <Link to={`/productdetails/${p._id}`}>
                           <div key={p._id} className='shadow-md rounded-md w-74 cursor-pointer transition-transform ease-in-out duration-300 hover:shadow-2xl hover:scale-105'>
                            <img className='w-full h-80' src={`https://green-pitch.onrender.com${p.brandimg}`} alt={p.brandname} height={150} width={150} />
                            <div className='p-3'>
                            <h3 className='text-center font-bold m-1'>{p.brandname}</h3>
                            <p className="text-sm m-2">
                                {p.branddesc.length > 100
                                    ? p.branddesc.slice(0, 100) + "..."
                                    : p.branddesc}
                            </p>
                            <p className='font-bold text-green-800'>Price: {p.brandprice} Taka</p>
                            <p>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={i < p.brandstar ? "text-yellow-500" : "text-gray-300"}>
                                        ★
                                    </span>
                                ))}
                            </p>
                            </div>
                        </div>
                        
                        </Link>
                    ))
                ) : (
                    <p>No products in this category</p>
                )}

            </div>)}
            <Footer/>
        </div>
    );
};

export default Listbyteam;