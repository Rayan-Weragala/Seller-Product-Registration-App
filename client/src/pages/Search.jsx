import { useEffect } from "react";
import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import Listingitem from "../components/Listingitem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata,setsidebardata] =useState({
    searchTerm:'',
    type:'all',
    offer:false,
    sort:'created_at',
    order:'desc'
  })
  const [loading,setLoading] =useState(false)
  const [listings,setListings] =useState([]);
  console.log(listings)
  
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const offerFromUrl = urlParams.get('offer')
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order')

    if(
      searchTermFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ){
      setsidebardata({
        searchTerm:searchTermFromUrl || '',
        offer:offerFromUrl === 'true' ? true:false,
        sort:sortFromUrl || 'created_at',
        order:orderFromUrl || 'desc' ,
      });
    }
  
    const fetchListings = async() =>{
      setLoading(true)
      const searchQuery = urlParams.toString();
      const res= await fetch(`/api/listing/get?${searchQuery}`)
      const data =await res.json();
      setListings(data);
      setLoading(false);
    }
    fetchListings();

  },[location.search]);

  const handleChange = (e) =>{
    if(e.target.id==='searchTerm'){
      setsidebardata({...sidebardata,searchTerm:e.target.value})
    }
    if(e.target.id ==='offer'){
      setsidebardata({...sidebardata,[e.target.id]:e.target.checked||e.target.checked==='true' ?
    true:false})
    }
    if (e.target.id === 'sort_order') {
      const sort_order = e.target.value;
      const [sort, order] = sort_order.split('_');
      setsidebardata({ ...sidebardata, sort, order });
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  

  return (
    <div className="flex flex-col md:flex-row">
      <div className='p-7 border-b-2 md:border-r-2
        md:min-h-screen'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Search 
                Term: </label>
                <input type='text'
                id='searchTerm'
                placeholder='Search...'
                className='border rounded-lg p-3 w-full'
                value={sidebardata.searchTerm}
                onChange={handleChange}
                />
            </div>
            <div className="flex gap-2">
                <label className="font-semibold">Type:</label>
                <div className="flex gap-2">
                    <input type="checkbox" id='offer'
                    className="w-5"
                    onChange={handleChange}
                    checked ={sidebardata.offer}
                    />
                    <span>Offer</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort:</label>
              <select onChange={handleChange}
                defaultValue={'Created_at_desc'}
                id="sort_order"
                className="border rounded-lg p-3">

                <option value='price_desc'>Price high to low</option>
                <option value='price_asc'>Price low to high</option>
                <option value='createdAt_desc'>Latest</option>
                <option value='createdAt_asc'>Oldest</option>
              </select>
            </div>
            <button className="bg-amber-500
            p-3 rounded-lg uppercase text-black hover:bg-amber-600">Search</button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className="text-3xl font-semibold 
        border-b p-3 text-slate-800 mt-5">Listing results:</h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 &&(
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading &&(
            <p className="text-xl text-slate-700 w-full">Loading....</p>
          )}
          {!loading && 
          listings && 
          listings.map((listing)=>(
            <Listingitem key={listing._id} listing={listing} />
             ))}
        </div>
      </div>
    </div>
  )
}
