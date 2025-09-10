import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Slider = () => {
  const [sliders, setSlider] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await axios.get('http://localhost:5000/slider');
        setSlider(fetch.data);
      } catch (e) {
        console.error('Slider fetching failed', e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Slide every 5 seconds

    return () => clearInterval(interval);
  }, [sliders]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliders.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (sliders.length === 0) return <div>Loading...</div>;

  const currentSlide = sliders[currentIndex];

  //console.log(`Image URL: http://localhost:5000/${currentSlide.image}`);
  //console.log(sliders[0],sliders[1],sliders[2])

  return (
    <div className="relative z-10 w-full h-[500px] max-w-screen">
      {/* Background Image */}
      <img
          src={`http://localhost:5000/${currentSlide.image}`}
           alt={currentSlide.headline}
          className="absolute inset-0 bg-conatin bg-center bg-no-repeat transition-all duration-500 z-0 h-full w-full"
         />

       

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-5xl mx-auto px-8 text-white">
        <h1 className="text-4xl font-bold mb-2">{currentSlide.headline}</h1>
        <p className="text-lg mb-4">{currentSlide.message}</p>
        <button className="px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition">
          {currentSlide.buttondata}
        </button>
      </div>

      {/* Navigation Arrows */}
      {/* <button
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        boxShadow: 'none',
      }}
        onClick={goToPrev}
        className="bg-transparent border-none outline-none appearance-none absolute top-1/2 left-4 transform -translate-y-1/2 z-20 text-white text-2xl  rounded-full px-3 py-1 hover:bg-opacity-70"
      >
        ◀
      </button> */}
      {/* <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 text-white text-2xl rounded-full px-3 py-1 hover:bg-opacity-70"
      >
        ▶
      </button> */}
    </div>
  );
};

export default Slider;
