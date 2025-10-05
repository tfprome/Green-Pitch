import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
  const [sliders, setSlider] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await axios.get('https://green-pitch.onrender.com/slider');
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

  const handleclick=()=>{
    console.log('button clicked')
    if(currentSlide.buttondata==='Take a look')
        navigate('/productlistbyteam/68a6b05006ac770502cbd3e6')
    if(currentSlide.buttondata==='Suit yourself')
      navigate('/productlistbyteam/68a6ad0106ac770502cbd3e4')
  }

  //console.log(`Image URL: https://green-pitch.onrender.com/${currentSlide.image}`);
  //console.log(sliders[0],sliders[1],sliders[2])

  return (
    <div className="relative z-10 w-full h-[500px] max-w-screen">
      {/* Background Image */}
      <img
          src={`https://green-pitch.onrender.com/${currentSlide.image}`}
           alt={currentSlide.headline}
          className="absolute inset-0 bg-conatin bg-center bg-no-repeat transition-all duration-500 z-0 h-full w-full"
         />

       

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-5xl mx-auto px-8 text-white">
        <h1 className="text-4xl font-bold mb-2">{currentSlide.headline}</h1>
        <p className="text-lg mb-4">{currentSlide.message}</p>
        <button onClick={handleclick} className="px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition">
          {currentSlide.buttondata}
        </button>
      </div>

      
    </div>
  );
};

export default Slider;
