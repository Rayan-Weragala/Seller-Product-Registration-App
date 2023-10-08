import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import Oauth from '../components/Oauth';

export default function Signup() {
  const [formData,setFormData] = useState({});
  const [error,setError] =useState(null);
  const [loading,setLoading] =useState(false);
  const navigate = useNavigate();

  const handleChange =(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
  }
  const handleSubmit =async(e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      const res =await fetch('/api/auth/signup',
      {
        method:'post',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success===false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      console.log(data);
      setError(null);
      navigate('/signin')

    }catch(error){
      setLoading(false);
      setError(error.message)
    }
  
  };
    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Seller Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex">
                    <div className="w-1/2 mr-2">
                        <label htmlFor="firstname" className="block text-md font-medium">First Name</label>
                        <input type="text" id="firstname" name="firstname" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"  onChange={handleChange}/>
                    </div>

                    <div className="w-1/2 ml-2">
                        <label htmlFor="lastname" className="block text-md font-medium">Last Name</label>
                        <input type="text" id="lastname" name="lastname" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600" onChange={handleChange} />
                    </div>

                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-md font-medium">Username</label>
                    <input type="text" id="username" name="username" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"  onChange={handleChange}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-md font-medium">Address</label>
                    <input type="text" id="address" name="address" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"  onChange={handleChange}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-md font-medium">Email</label>
                    <input type="text" id="email" name="email" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"  onChange={handleChange}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="mobile" className="block text-md font-medium">Mobile Number</label>
                    <input type="text" id="mobile" name="mobile" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600" onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label htmlFor="bio" className="block text-md font-medium">Short description about yourself</label>
                    <textarea id="bio" name="bio" rows="4" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"  onChange={handleChange}></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-md font-medium">Password</label>
                    <input type="password" id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"  onChange={handleChange}/>
                </div>

                <div className="mt-6">
                    <button disabled={loading} className="mt-1 p-2 w-full border border-gray-300 rounded-lg bg-teal-600 text-white uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...':'Submit'}</button>
                    <Oauth/>
                </div>
            </form>
            <div className='flex gap-2 mt-5'>
              <p>Have an account?</p>
              <Link to={"/signin"}>
                <span className=' text-black  hover:font-bold'>Sign in</span>
              </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    );
}

