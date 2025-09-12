import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Green Pitch</h2>
          <p className="text-sm">
            Your one-stop shop for premium products.  
            Quality and style delivered to your door.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Popular Sections</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/productlistbybrand/689ade5d865b0ab90a95a205" className="hover:text-white">Adidas</a></li>
            <li><a href="/productlistbybrand/689adf13865b0ab90a95a209" className="hover:text-white">New Balance</a></li>
            <li><a href="/productlistbyteam/68a6b05006ac770502cbd3e6" className="hover:text-white">Club Jerserys</a></li>
            <li><a href="/productlistbyteam/68a6ad0106ac770502cbd3e4" className="hover:text-white">Boots</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/returns" className="hover:text-white">Returns & Refunds</a></li>
            <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaYoutube /></a>
          </div>
        </div>
      </div>

    
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Green Pitch. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
