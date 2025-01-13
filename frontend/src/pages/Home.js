import React, {useContext,useRef} from 'react';
//import product context
import {ProductContext} from '../contexts/ProductContext';
//import components
import Product from '../components/Product';
import Hero from '../components/Hero';

const Home = () => {
  //get products from product context
  const {products}=useContext(ProductContext);
  const discoverRef=useRef();
  const scrolltoDiscover=()=>{
    discoverRef.current.scrollIntoView({behavior:'smooth'});
  }
  
  
  return (<div>
          <Hero scrolltoDiscover={scrolltoDiscover}/>
          <section className='py-16' ref={discoverRef}>
            <div className='container mx-auto'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] mx-auto max-w-sm md:max-w-none md:mx-0'>
                {products.map(product=>{
                  return(
                    <Product product={product} key={product._id} />
                  );
                })}
              </div>
            </div>
          </section>
          </div>);
};

export default Home;
