import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import ProductShowSkeleton from "./skeleton/products-skeleton";

const ProductShow = () => {
  const [products, setProducts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://green-pitch.onrender.com/getproducts"
        );
        setProducts(res.data);
        setLoading(false)
      } catch (e) {
        console.error("Failed to fetch products:", e);
      }
    };
    fetchProducts();

    setWindowWidth(window.innerWidth);

    // Update on resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlidesToShow = () => {
    if (windowWidth < 640) return 1; 
    if (windowWidth < 1024) return 2; 
    if (windowWidth < 1280) return 3; 
    return 4; // PC / large screens
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };



  return (
   <div>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        Our Top Products
      </h2>
    {loading?
    <ProductShowSkeleton count={4}/>:
    <div>
       <div className="w-full px-2 sm:px-4 md:px-6 lg:px-10 py-6">
      
      <Slider {...settings}>
        {products.slice(0, 10).map((item) => (
          <div key={item._id} className="p-2 sm:p-3">
            <Link to={`/productdetails/${item._id}`}>
              <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 hover:bg-gray-100 transform transition flex flex-col h-full">
                <img
                  src={`https://green-pitch.onrender.com${item.brandimg}`}
                  alt={item.brandname}
                  className="w-full h-36 sm:h-44 md:h-52 object-contain bg-gray-50"
                />
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-1">
                    {item.brandname}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                    {item.branddesc}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-blue-600 font-bold text-sm sm:text-base">
                      ৳{item.brandprice}
                    </p>
                    <p className="text-yellow-500 font-semibold text-sm sm:text-base">
                      {item.brandstar}★
                    </p>
                  </div>
                  <button className="mt-3 w-full bg-green-600 text-white py-1.5 sm:py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base">
                    Take a look
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div></div>}
   </div>
  );
};

export default ProductShow;
