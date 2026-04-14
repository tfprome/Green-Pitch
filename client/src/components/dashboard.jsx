// Dashboard.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import gplogo from '../assets/gplogo.png';
import { GetIndividualUser } from '../helpers/DashboardApi';
import { fetchProducts } from '../helpers/ProductsApi';
import { UserCircleIcon, CurrencyDollarIcon, ShoppingBagIcon, ChartBarIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const [totalproducts, setTotalproducts] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userdata = await GetIndividualUser();
        setUser(userdata);
      } catch (error) {
        console.log("User fetch failed");
        // maybe redirect to login
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const Products = async () => {
      try {
        const productsdata = await fetchProducts();
        setProducts(productsdata.data)
        setTotalproducts(productsdata.total)
        //setLoading(false)
      }
      catch (e) {
        console.log('products fetching failed', e)
      }
    }

    Products();
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  //console.log('totalproducts',totalproducts)

  // Sample data for the boxes
  const stats = [
    {
      title: 'Total Sales',
      value: '₹1,24,563',
      change: '+12.5%',
      icon: CurrencyDollarIcon,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Total Revenue',
      value: '₹2,45,890',
      change: '+8.2%',
      icon: ChartBarIcon,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'No. of Products',
      value: totalproducts,
      change: '+23 this month',
      icon: ShoppingBagIcon,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="flex">
      {/* Left Sidebar - Dashboard */}
      <div className="h-screen bg-[#F0FFFF] shadow-xl w-72 flex flex-col fixed left-0 top-0">
        <div className="flex items-center space-x-3 p-6 border-b border-gray-400">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
            <img src={gplogo} alt='gplogo' height={50} width={50}></img>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-800">Green Pitch</h1>
            <p className="text-xs text-gray-800">Dashboard</p>
          </div>
        </div>
        <div className="flex-1 py-6 px-4">
          <div className="space-y-2">
            {/* Products Option */}
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-black hover:bg-blue-50 rounded-xl transition group"
              onClick={() => { navigate('/admin/view/products') }}>
              <span className="font-medium">Products</span>
              <span className="ml-auto text-xs text-gray-400">24</span>
            </button>

            {/* Brands Option */}
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-black hover:bg-purple-50 rounded-xl transition group">
              <span className="font-medium">Brands</span>
              <span className="ml-auto text-xs text-gray-400">12</span>
            </button>

            {/* Categories Option */}
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-black hover:bg-green-50 rounded-xl transition group">
              <span className="font-medium">Categories</span>
              <span className="ml-auto text-xs text-gray-400">8</span>
            </button>

            {/* User Option */}
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-black hover:bg-green-50 rounded-xl transition group">
              <span className="font-medium">Users</span>
              <span className="ml-auto text-xs text-gray-400">8</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-400">
          <div className="flex items-center space-x-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <UserCircleIcon size={32}
                className='cursor-pointer text-gray-600 hover:text-gray-800 transition'
                onClick={() => setIsOpen(prev => !prev)} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-black">{user.name}</p>
              <p className="text-xs text-black">{user.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="ml-72 flex-1 p-8">
        {/* Stats Cards - Flex row at top */}
        <div className="flex flex-wrap gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex-1 min-w-[250px] cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold mb-2">{stat.value}</p>
                      <p className="text-white/90 text-xs font-medium">{stat.change}</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3">
                      <IconComponent size={28} weight="duotone" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {isOpen && (
            <div className="fixed bottom-16 left-4 bg-white rounded-lg shadow-lg p-4 w-48">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 cursor-not-allowed  rounded-md transition">Profile</button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 cursor-not-allowed  rounded-md transition">Settings</button>
              <button className="w-full text-left px-3 py-2 text-sm font-semibold cursor-pointer hover:bg-gray-100 rounded-md transition"
                onClick={handleLogout}>Logout</button>
            </div>
          )

          }
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;