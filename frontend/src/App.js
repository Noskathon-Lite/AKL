import React from 'react';
//import router dom
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
//import pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import PostProduct from './pages/Postpage';
import UserSidebar from './pages/UserSidebar';

//import components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  return <div className='overflow-hidden'>
          
           <Router>
            <Header />
            <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/postpage" element={<PostProduct />} />
            <Route path="/user-info" element={<UserSidebar />} />

            </Routes>
            <Sidebar />
           <Footer />
           </Router>
           
         </div>;
};

export default App;
