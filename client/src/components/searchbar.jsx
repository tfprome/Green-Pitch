import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await axios.get(`https://green-pitch.onrender.com/productlistbykeyword/${value}`);
      setResults(res.data.data);
      setShowDropdown(true);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
       className="rounded-lg shadow-md py-2 px-2 w-24 sm:w-32 lg:w-78 bg-purple-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        onFocus={() => searchTerm && setShowDropdown(true)}
      />

      {showDropdown && results.length > 0 && (
        <div className="absolute right-0 left-0 bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-50">
          {results.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center px-4 py-2 hover:bg-green-100 cursor-pointer"
              onClick={() => {
                navigate(`/productdetails/${product._id}`);
                setShowDropdown(false);
                setSearchTerm('');
              }}
            >
              <div>
                <p className="font-semibold">{product.brandname}</p>
                <p className="text-gray-600 text-sm">{product.branddesc}</p>
              </div>
              {product.brand?.brandimg && (
                <img
                  src={`https://green-pitch.onrender.com${product.brandimg}`}
                  alt={product.title}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
