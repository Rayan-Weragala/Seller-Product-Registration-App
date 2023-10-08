import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-green-400 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Arti</span>
                <span className='text-slate-700'>crafts</span>
            </h1>
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type='text' placeholder='Search...'
                className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-slate-600'/>
            </form>
            <ul className='flex gap-4'>
                <Link to='home'>
                <li className='hidden sm:inline text-black font-medium hover:font-bold'>Home</li>
                </Link>
                <Link to='about'>
                <li className='hidden sm:inline text-black font-medium hover:font-bold'>About</li>
                </Link>
                <Link to='signin'>
                <li className='font-medium text-black hover:font-bold'>Sign in</li>
                </Link>
            </ul>
        </div>
      
    </header>
  )
}
