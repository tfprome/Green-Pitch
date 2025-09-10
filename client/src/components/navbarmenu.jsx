import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NavbarMenu = () => {
  const [teamname, setTeams] = useState([]);
  const [brandname, setBrands] = useState([]);
  const [categoryname, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, brandsRes, categoriesRes] = await Promise.all([
          axios.get('https://green-pitch.vercel.app//teamname'),
          axios.get('https://green-pitch.vercel.app//brandname'),
          axios.get('https://green-pitch.vercel.app//categoryname'),
        ]);

        console.log("Teams:", teamsRes.data);
      console.log("Brands:", brandsRes.data);
      console.log("Categories:", categoriesRes.data);

        setTeams(teamsRes.data.data);
        setBrands(brandsRes.data.data);
        setCategories(categoriesRes.data.data);
      } catch (err) {
        console.error('Navbar fetch error:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="hidden lg:flex flex-wrap gap-4">
      {/* Teams */}
      <div className="flex gap-4">
        {teamname.map((team) => (
          <h1 key={team} className="mr-10 font-semibold cursor-pointer border-b-2 border-transparent hover:border-gray-700 transition duration-150 ease-in-out">
            {team}
          </h1>
        ))}
      </div>

      {/* Brands */}
      <div className="flex gap-4">
      {brandname.length > 0 ? (
    brandname.map((brand) => (
      <h1
        key={brand}
        className="mr-10 font-semibold cursor-pointer border-b-2 border-transparent hover:border-gray-700 transition duration-150 ease-in-out"
      >
        {brand}
      </h1>
    ))
  ) : (
    <span>No brands</span> 
  )}
      </div>

      {/* Categories */}
      <div className="flex gap-4">
      {categoryname.length > 0 ? (
    categoryname.map((cat) => (
      <h1
        key={cat}
        className="mr-10 font-semibold cursor-pointer border-b-2 border-transparent hover:border-gray-700 transition duration-150 ease-in-out"
      >
        {cat}
      </h1>
    ))
  ) : (
    <span>No categories</span> 
  )}
      </div>
    </div>
  );
};

export default NavbarMenu;
