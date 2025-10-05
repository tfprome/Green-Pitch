import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, ShoppingCart, LogOut, Menu, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartDropdown from "./Cartdropdown";
import SearchBar from "./searchbar";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [teamname, setTeams] = useState([]);
  const [brandname, setBrands] = useState([]);
  const [categoryname, setCategories] = useState([]);

  const [showTeams,setShowTeams]=useState(false)
  const [showBrands,setShowBrands]=useState(false)
  const [showCategories,setShowCategories]=useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);

    const fetchData = async () => {
      try {
        const [teamsRes, brandsRes, categoriesRes] = await Promise.all([
          axios.get("https://green-pitch.onrender.com/teamname"),
          axios.get("https://green-pitch.onrender.com/brandname"),
          axios.get("https://green-pitch.onrender.com/categoryname"),
        ]);
        setTeams(teamsRes.data.data || []);
        setBrands(brandsRes.data.data || []);
        setCategories(categoriesRes.data.data || []);
      } catch (err) {
        console.error("Navbar fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    toast.success("You are logged out",{autoClose:1000,pauseOnHover:false})
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const toggleCart = () => setShowCart((prev) => !prev);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <div className="shadow-lg h-16 relative bg-white">
      <div className="flex items-center justify-between px-4 lg:px-10 h-full">
        {/* Left menu (lg) or dropdown toggle (sm) */}
        <div className="flex items-center">
          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <Menu
              size={28}
              className="cursor-pointer"
              onClick={toggleDropdown}
            />
          </div>

          {/* LG left menu with hover dropdowns */}
          <div className="hidden lg:flex gap-8">

            <div className="relative group">
              <h1 className="font-semibold border-b-2 cursor-context-menu border-transparent group-hover:border-gray-700 transition">
                Teams
              </h1>
              <div className="absolute hidden  group-hover:grid bg-white shadow-md rounded-md mt-5 p-4 z-50
                  grid-cols-3 gap-4 min-w-max">
                {teamname.map((team) => (
                  <p
                    key={team}
                    className="px-2 py-1  hover:bg-gray-100 whitespace-nowrap"
                  >
                    {team}
                  </p>
                ))}
              </div>
            </div>


            <div className="relative group">
              <h1 className="font-semibold border-b-2 cursor-context-menu border-transparent group-hover:border-gray-700 transition">
                Categories
              </h1>
              <div className="absolute hidden group-hover:grid bg-white shadow-md rounded-md mt-5 p-4 z-50
                  grid-cols-3 gap-4 min-w-max">
                {categoryname.map((cat) => (
                  <p
                    key={cat}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  >
                    {cat}
                  </p>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="relative group">
              <h1 className="font-semibold border-b-2 cursor-context-menu border-transparent group-hover:border-gray-700 transition">
                Brands
              </h1>
              <div className="absolute hidden group-hover:grid bg-white shadow-md rounded-md mt-5 p-4 z-50
                  grid-cols-3 gap-4 min-w-max">
                {brandname.map((brand) => (
                  <p
                    key={brand}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  >
                    {brand}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <h1
            className="font-extrabold text-green-700 cursor-context-menu text-xl lg:text-4xl lg:ml-30"
            onClick={() => navigate("/home")}
          >
            Green Pitch
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <SearchBar />
          {isLoggedIn ? (
            <LogOut
              size={28}
              strokeWidth={1.25}
              className="cursor-pointer hover:scale-110"
              onClick={handleLogout}
            />
          ) : (
            <User
              size={28}
              strokeWidth={1.25}
              className="cursor-pointer hover:scale-110"
              onClick={() => navigate("/login")}
            />
          )}
          <ShoppingCart
            size={28}
            strokeWidth={1.25}
            className="cursor-pointer hover:scale-110"
            onClick={toggleCart}
          />
          {showCart && <CartDropdown isOpen={showCart} />}
          <Gift
            size={28}
            strokeWidth={1.25}
            className="cursor-pointer hover:scale-110"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/wish");
              } else {
                toast.warn("Please log in to access your wishlist!",{autoClose:1000,onClose:()=> navigate("/login")});
              }
            }}
          />
        </div>
      </div>

      {showDropdown && (
  <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md z-50">
    <div className="flex flex-col items-start px-4 py-2 gap-2">

      {/* Teams */}
      <div className="w-full">
        <h1
          className="font-semibold cursor-pointer flex justify-between items-center py-1"
          onClick={() => setShowTeams((prev) => !prev)}
        >
          Teams
          <span>{showTeams ? "-" : "+"}</span>
        </h1>
        {showTeams &&
          teamname.map((team) => (
            <p
              key={team}
              className="pl-4 py-1 hover:text-green-700 cursor-pointer"
            >
              {team}
            </p>
          ))}
      </div>

      {/* Categories */}
      <div className="w-full">
        <h1
          className="font-semibold cursor-pointer flex justify-between items-center py-1 mt-2"
          onClick={() => setShowCategories((prev) => !prev)}
        >
          Categories
          <span>{showCategories ? "-" : "+"}</span>
        </h1>
        {showCategories &&
          categoryname.map((cat) => (
            <p
              key={cat}
              className="pl-4 py-1 hover:text-green-700 cursor-pointer"
            >
              {cat}
            </p>
          ))}
      </div>

      {/* Brands */}
      <div className="w-full">
        <h1
          className="font-semibold cursor-pointer flex justify-between items-center py-1 mt-2"
          onClick={() => setShowBrands((prev) => !prev)}
        >
          Brands
          <span>{showBrands ? "-" : "+"}</span>
        </h1>
        {showBrands &&
          brandname.map((brand) => (
            <p
              key={brand}
              className="pl-4 py-1 hover:text-green-700 cursor-pointer"
            >
              {brand}
            </p>
          ))}
      </div>

    </div>
  </div>
)}

    </div>
  );
};

export default Navbar;
