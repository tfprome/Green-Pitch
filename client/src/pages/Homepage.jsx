import React from 'react';
import Slider from '../components/slider';
import Navbar from '../components/navbar';
import BrandShow from '../components/brandshow';
import Productshow from '../components/productshow';
import Categoryshow from '../components/teamshow';
import Footer from '../components/Footer';

const Home = (props) => {
    return (
        
       <div>
         <Navbar/>
         <Slider/>
         <BrandShow/>
         <Categoryshow/>
         <Productshow/>
         <Footer/>
       </div>
    );
};

export default Home;