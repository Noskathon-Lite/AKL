import React from 'react';
//import image
import Offers from '../img/tomato.jpg';
import Offer from '../img/cabbage.jpg';
import Offerss from '../img/oranges.jpg';
//import Link
import {Link} from 'react-router-dom';

const Hero = ({scrolltoDiscover}) => {
  return (<section className="bg-lime-100 h-[800px] bg-no-repeat bg-cover bg-center py-24">
    <div className='container'>
     <div className='grid grid-cols-2'>
        <div className='flex-col '>
          <div className='my-[200px] ml-[200px]'>
            <h1 className='font-bold text-6xl mb-3'>Haat Bazar</h1>
            <Link to='#' onClick={scrolltoDiscover} className='border-b border-black'>Discover More</Link>
          </div>
        </div>
        <div className='gap-4'>
        <div
              id="offer1"
              className="offers hover:shadow-lg hover:scale-105 hover:opacity-80 transition-all duration-300"
            >
              <img src={Offers} alt="Fresh tomatoes" loading="lazy" />
            </div>

            {/* Offer 2 */}
            <div
              id="offer2"
              className="offers hover:scale-105 hover:opacity-80 transition-all duration-300"
            >
              <img src={Offer} alt="Fresh cabbage" loading="lazy" />
            </div>

            {/* Offer 3 */}
            <div id="offer3" className="offers hover:shadow-lg hover:scale-105 hover:opacity-80 transition-all duration-300">
              <img src={Offerss} alt="Fresh oranges" loading="lazy" />
            </div>
        </div>
     </div>
    </div>
  </section>);
};

export default Hero;
