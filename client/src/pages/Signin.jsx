import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signInStart,signInFailure,signInSuccess} from '../redux/user/userSlice'

export default function Signin() {
  const [formData,setFormData] = useState({});
  const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch =useDispatch();

  const handleChange =(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
  }
  const handleSubmit =async(e)=>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res =await fetch('/api/auth/signin',
      {
        method:'post',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success===false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      console.log(data);
      navigate('/')

    }catch(error){
      dispatch(signInFailure(error.message))
    }
  
  };
    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
            <form onSubmit={handleSubmit}>
                

                <div className="mb-4">
                    <label htmlFor="username" className="block text-md font-medium">Username</label>
                    <input type="text" id="username" name="username" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"  onChange={handleChange}/>
                </div> 
                <div className="mb-4">
                    <label htmlFor="password" className="block text-md font-medium">Password</label>
                    <input type="password" id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"  onChange={handleChange}/>
                </div>

                <div className="mt-6">
                    <button disabled={loading} className="mt-1 p-2 w-full border border-gray-300 rounded-lg bg-teal-600 text-white uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...':'Sign In'}</button>
                </div>
            </form>
            <div className='flex gap-2 mt-5'>
              <p>Dont have an account?</p>
              <Link to={"/signup"}>
                <span className=' text-black  hover:font-bold'>Sign up</span>
              </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    );
}

