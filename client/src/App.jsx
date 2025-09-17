import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Homepage.jsx';
import Listbybrand from './pages/listbybrandpage.jsx';
import Listbyteam from './pages/listbycategorypage.jsx';
import Login from './pages/loginpage.jsx';
import Signup from './pages/signup.jsx';
import ProductDetails from './pages/productdetailspage.jsx';
import Cartpage from './pages/Cartpage.jsx';
import Wishpage from './pages/wishpage.jsx';
import SearchBar from './components/searchbar.jsx';
import NavbarMenu from './components/navbarmenu.jsx';
import InvoicePage from './pages/invoicepage.jsx';
import { ToastContainer } from 'react-toastify';



function App() {

  return (
    <>
      <div>
       
        <BrowserRouter>
           <Routes>
            <Route path='/' element={<Home/>}></Route>
              <Route path='/home' element={<Home/>}></Route>
              <Route path='/productlistbybrand/:id' element={<Listbybrand/>}></Route>
              <Route path='/productlistbyteam/:id' element={<Listbyteam/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/productdetails/:id' element={<ProductDetails/>}></Route>
              <Route path='/cart' element={<Cartpage/>}></Route>
              <Route path='/wish' element={<Wishpage/>}></Route>
              <Route path='/search' element={<SearchBar/>}></Route>
              <Route path='/navbarmenu' element={<NavbarMenu/>}></Route>
              <Route path='/invoicepage/:id' element={<InvoicePage/>}></Route>
           </Routes>
           <ToastContainer position='top-center' pauseOnHover={false}/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
