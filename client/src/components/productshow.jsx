import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const ProductShow = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://green-pitch-server-production.up.railway.app/getproducts"); 
        setProducts(res.data);
      } catch (e) {
        console.error("Failed to fetch products:", e);
      }
    };
    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:4, 
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 4 } }, 
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, centerMode: true, centerPadding: "20px" } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-10 py-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        Our Top Products
      </h2>
      <Slider {...settings}>
        {products.slice(0, 10).map((item) => (
          <div key={item._id} className="p-2 sm:p-3">
            <Link to={`/productdetails/${item._id}`}>
              <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 hover:bg-gray-100 transform transition flex flex-col h-full">
                <img
                  src={`https://green-pitch-server-production.up.railway.app${item.brandimg}`}
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
    </div>
  );
};

export default ProductShow;
