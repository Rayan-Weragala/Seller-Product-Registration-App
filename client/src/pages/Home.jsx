import { useEffect } from 'react';
import { useState } from 'react'
import {Link} from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle';
import Listingitem from '../components/Listingitem';
export default function Home() {
  const [offerListings,setOfferListings] = useState([]);
  const [salesListings,setSalesListings] = useState([]);
  
  SwiperCore.use([Navigation])
  console.log(offerListings)
  useEffect(()=>{
    const fetchOfferListings = async() =>{
      try{
        const res = await fetch ('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
      }catch(error){
        console.log(error)
      }
    }
    fetchOfferListings();
  },[])
  return (
    <div>
      {/*top*/}
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-slate-700 font-bold text-3xl
      lg:text-6xl'>Discover Unique <span className='text-amber-600'>Treasures:</span> 
       <br/>
       Your Local Artisan Marketplace</h1>
      <div className='text-gray-500 '>
      Explore the Rich Tapestry of Local Artistry - Shop Handcrafted Artisanal Treasures,
      <br />
      Unearth Hidden Gems, and Support Your Community's Craftsmanship at ArtiCraft!
      </div>
      <Link to ={"/search"} className='text-emerald-900 font-bold hover:underline'>
        Let's get started...
      </Link>
    </div>

      {/*swiper */}
      <Swiper navigation>
      {
      offerListings && offerListings.length>0 &&
      offerListings.map((listing)=>(
        <SwiperSlide key={listing._id}>
        <div
          style={{
            backgroundImage: `url(${listing.imageUrls[0]})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            height: '500px' // You can set the height directly here
          }}
        ></div>
      </SwiperSlide>
      ))
    }
      </Swiper>
    
      {/*listing result for offer */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        
        {offerListings && offerListings.length>0 &&(
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-700'>Recent Offers</h2>
              <Link className=' text-emerald-900 hover:underline' to='/search?offer=true'>
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {
                offerListings.map((listing)=>(
                  <Listingitem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )}
        {offerListings && offerListings.length>0 &&(
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-700'>Most Popular</h2>
              <Link className=' text-emerald-900 hover:underline' to='/search?offer=true'>
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {
                offerListings.map((listing)=>(
                  <Listingitem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )}
        {offerListings && offerListings.length>0 &&(
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-700'>Custermized products</h2>
              <Link className=' text-emerald-900 hover:underline' to='/search?offer=true'>
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {
                offerListings.map((listing)=>(
                  <Listingitem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
