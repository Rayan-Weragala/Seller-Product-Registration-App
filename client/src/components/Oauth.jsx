import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase'
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom'
export default function Oauth() {

  const dispatch =useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async ()=>{
    try{
     const provider = new GoogleAuthProvider()
     const auth = getAuth(app)

      const result = await signInWithPopup(auth,provider)
      const res = await fetch ('/api/auth/google',{
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL})
         
      })
      
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/')
      
    }catch(error){
      console.log("Could not sign in with google",error);
    }
  }
  return (
    <button onClick={handleGoogleClick} type='button' className="mt-1 p-2 w-full rounded-lg bg-indigo-900 text-white uppercase hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-80">
      Continue with Google
    </button>
  )
}
