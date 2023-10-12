import {Link} from 'react-router-dom'
import {BiSolidCategory} from 'react-icons/bi'

export default function Listingitem({listing}) {
  const categoryMapping = {
    1: 'Paintings',
    2: 'Sculptures',
    3: 'Prints and Posters',
    4: 'Ceramics and Pottery',
    5: 'Jewelry',
    6: 'Textiles and Fabrics',
    7: 'Paper craft',
    8: 'Wood craft',
    9: 'Glass craft',
    10: 'Leather craft',
    11: 'Metal craft',
    12: 'Traditional craft',
  };
  return (
    <div className='bg-white shadow-md hover:shadow-lg 
    transition-shadow overflow-hidden rounded-lg w-full sm:w-[250px]'>
     <Link to={`/listing/${listing._id}`}>
      <img src={listing.imageUrls[0]}
      className='h-[320px] sm:h[220px] w-full object-cover
      hover:scale-105 transition-scale duration-300'
      />
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-lg font-semibold
         text-slate-900'>{listing.name}</p>
         <div className='flex items-center gap-1'>
          <BiSolidCategory className='h-4 w-4 text-green-800' />
          <p className='text-sm text-gray-700'>{categoryMapping[listing.category]}</p>
         </div>
         <p className='text-sm text-gray-700 line-clamp-2'>{listing.description}</p>
         <p className='text-slate-500 mt-2 font-semibold'>
          Rs. {listing.offer ? listing.
          discount.toLocaleString('en-US'):listing.
          discount.toLocaleString('en-US')}
         </p>
         <div className='text-sm font-semibold'>
          Dimension: ({listing.height} x {listing.width} x {listing.depth} )cm³ 
         </div>
         <div className='text-sm font-semibold'>
          {listing.stock>1 ?`${listing.stock} stocks`:`${listing.stock} stock`}
         </div>
      </div>
     </Link>
    </div>
  )
}
