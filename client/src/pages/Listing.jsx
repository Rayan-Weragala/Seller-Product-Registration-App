import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle'


export default function Listing() {
    SwiperCore.use([Navigation])
    const [listing,setListing] =useState(null)
    const [loading,setLoading]= useState(false)
    const [error,setError] = useState(false)
    const params =useParams();
    
    useEffect(()=>{
        const fetchListing = async()=>{
            try{
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.
                    listingId}`);
                    const data = await res.json();
                    if(data.success===false){
                        setError(true);
                        setLoading(false)
                        return;
                    }
                    setListing(data)
                    setLoading(false)
                    setError(false)
                    
            }catch(error){
                setError(true)
                setLoading(false)
            }            
        }
        fetchListing();
    },[params.listingId])
  
    return (
        <main>
          {loading && (
            <p className="text-center my-7 text-2xl">Loading...</p>
          )}
          {error && (
            <div className="text-center my-7 text-2xl">
              <p>Something went wrong!</p>
              <button onClick={() => window.history.go(-1)} className="bg-indigo-900 text-white px-1 py-1 mt-2 rounded-md">
                Go Back
              </button>
            </div>
          )}
          {listing && !loading && !error && (
            <div>
              <Swiper navigation>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                      className="h-[600px] w-[600px] mt-2"
                      style={{
                        backgroundImage: `url(${url})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </main>
      );
}      
