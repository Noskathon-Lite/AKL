import React,{useContext,useEffect,useState} from 'react';
import {SidebarContext} from '../contexts/SidebarContext';
import {UserSidebarContext} from '../contexts/UserSidebarContext';
import {CartContext} from '../contexts/CartContext';
import {UserContext} from '../contexts/UserContext';
import Cart from '../img/cart.png';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';
import Logo from '../img/logo.png';
import Profile from '../img/profile.png';
import Search from '../img/Search.png';
import '../index.css';


const Header = () => {
  const[isActive,setIsActive]=useState(false);
  const {isOpen,setIsOpen}=useContext(SidebarContext);
  const {isUserOpen,setIsUserOpen}=useContext(UserSidebarContext);
  const params = useParams();
  console.log(params,'params ')

  const {itemAmount}=useContext(CartContext);
  // const user = useContext(UserContext);
  // console.log(user,'user ')



  // search state
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [headerShow,setHeaderShow] = useState('');

  console.log(headerShow,'headershow')


  // Static suggestion
  const sampleResults = ['Bitter Gourd', 'Tomato', 'Mushroom', 'Potato', 'Brinjal', 'Pumpkin', 'Carrots', 'Cauliflower'];

  // Handle the search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Debounce the search query to optimize performance
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timeout); // Cleanup timeout when component unmounts or query changes
    };
  }, [searchQuery]);



//   useEffect(() => {
// console.log('here',user?.email)
//     if(user?.user?.email) {
//       setHeaderShow(true)
//     }; 
//     setHeaderShow(false)
//   }, [user]);

  // Fetch or filter search results
  useEffect(() => {
    const filteredResults = sampleResults.filter(item =>
      item.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]); // We don't need sampleResults in the dependency array since it's static


  // Scroll event listener to handle header styles
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
 <header className={`${isActive ? 'bg-lime-700 py-4 shadow-md' : 'bg-lime-700 py-4'} fixed w-full z-10 transition-all`}>
    <div className='container mx-auto flex items-center justify-between h-full'>
      <Link to={'/'}>
        <div className='flex-shrink-0'>
          <img className='w-[90px]' src={Logo} alt='Logo' />
        </div>
      </Link>

      {/* Search Bar */}
   <div className="flex-grow mx-4 relative">
          <div className="headerSearch flex items-center w-full leading-10 border-4 bg-stone-950">
            <img className="w-[26px] opacity-70" src={Search} alt="Search Icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search in Haat Bazar"
              className="w-full h-6.5 border-none bg-transparent focus:outline-none pl-2"
              aria-label="Search products"
            />
          </div>
          {/* Search Results Dropdown */}
          {debouncedQuery && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white shadow-md max-h-60 overflow-y-auto">
              {searchResults.map((result, index) => (
                <div key={index} className="p-2 text-black hover:bg-gray-100 cursor-pointer">
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>
    
        
      {/* User Sidebar Button */}
      <Link to={'/user-info'}
          >
          <div className="flex-shrink-0 order-1">
            <img className="w-[50px]" src={Profile} alt="User Profile" />
          </div>
          </Link>


      {/*cart*/}
      <div onClick={()=>setIsOpen(!isOpen)}
        className='cursor-pointer flex'>
      <img className="w-[90px]" src={Cart} alt="Shopping Cart" />
      </div>
      {itemAmount > 0 && (
      <div className='bg-red-500 absolute -bottom-3 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center '>
        {itemAmount}
      </div>
      )}
    </div>
 </header>);
};




export default Header;
