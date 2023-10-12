import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


export default function Header() {
    const {curruntUser} =useSelector(state =>state.user)
    const [searchTerm,setSearchTerm] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set('searchTerm',searchTerm)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    useEffect (() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    },[location.search])
        

  return (
    <header className='bg-teal-600 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Arti</span>
                <span className='text-slate-700'>crafts</span>
            </h1>
            </Link>
            <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input  
                    type='text' 
                    placeholder='Search...'
                    className='bg-transparent focus:outline-none w-24 sm:w-64'
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    
                />
                <button>
                    <FaSearch className='text-slate-600'/>
                </button>
            </form>
            <ul className='flex gap-4'>
                <Link to='home'>
                <li className='hidden sm:inline text-black font-medium hover:font-bold'>Home</li>
                </Link>
                <Link to='about'>
                <li className='hidden sm:inline text-black font-medium hover:font-bold'>About us</li>
                </Link>
                <Link to='/profile'>
                {curruntUser ? (
                    <img className='rounded-full h-8 w-8 
                    object-cover'
                    src={curruntUser.avatar} alt='profile' />
                ):(
                <li className='font-medium text-black hover:font-bold'>Sign in</li> 
                )}
                   </Link>
            </ul>
        </div>
      
    </header>
  )
}
