import React,{useContext} from 'react';
//import useParams
import {useParams} from 'react-router-dom';
//import cart context
import {CartContext} from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';

const ProductDetails = () => {
  //get the product id from the url
  const {id}=useParams();
  const {products}=useContext(ProductContext);
  const {addToCart}=useContext(CartContext);

  //get the single product based on the id

  const product= products.find((item)=>{
    return item._id===id;
  });
//if product is not found
if(!product){
 return(
  <section className='h-screen flex justify-center items-center'>
    Loading...
  </section>
 );
}

//destructure product
  const {title,price,description,image}=product;
  return (<section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
    <div className='container mx-auto'>
      <div className='flex flex-col lg:flex-row items-center grid grid-cols-2'>
      <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
        <img className='max-w-[300px] ' src={image} alt='' />
      </div>
      <div>
      <div className='flex-1 text-center lg:text-left'>
        <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>
          {title}
        </h1>
        <div className='text-xl text-red-500 font-medium mb-6'>Rs.{price}</div>
      </div>
      <p className='mb-8'>{description}</p>
      <button onClick={()=>addToCart(product,product.id)} className='bg-primary py-4 px-8 text-white'>Add to Cart</button>
      </div>
      </div>
    </div>
  </section>);
};

export default ProductDetails;
