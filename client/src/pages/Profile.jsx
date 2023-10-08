import {useSelector} from 'react-redux'

export default function Profile() {
  const {curruntUser} =useSelector((state)=>state.user)
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-3xl font-semibold text-center
      my-3">My Profile</h2>
      <form className='flex flex-col'>
        <img src={curruntUser.avatar} alt=''
        className='rounded-full h-24 w-24 object-cover
        cursor-pointer self-center mt-2'
        />
                <div className="mb-4 flex mt-5">
                    <div className="w-1/2 mr-2">
                        <label htmlFor="firstname" className="block text-md font-medium">First Name</label>
                        <input type="text" id="firstname" name="firstname" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"  />
                    </div>

                    <div className="w-1/2 ml-2">
                        <label htmlFor="lastname" className="block text-md font-medium">Last Name</label>
                        <input type="text" id="lastname" name="lastname" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"/>
                    </div>

                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-md font-medium">Username</label>
                    <input type="text" id="username" name="username" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600" />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-md font-medium">Address</label>
                    <input type="text" id="address" name="address" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600" />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-md font-medium">Email</label>
                    <input type="email" id="email" name="email" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="mobile" className="block text-md font-medium">Mobile Number</label>
                    <input type="text" id="mobile" name="mobile" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600" />
                </div>

                <div className="mb-4">
                    <label htmlFor="bio" className="block text-md font-medium">Short description about yourself</label>
                    <textarea id="bio" name="bio" rows="4" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600" ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-md font-medium">Password</label>
                    <input type="password" id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"/>
                </div>
                <div className="mt-6">
                    <button className="mt-1 p-2 w-full border border-gray-300 rounded-lg bg-teal-600 text-white uppercase hover:bg-teal-700">Update</button>                    
                </div>
             </form>
             <div className='flex justify-between mt-5'>
              <span className='text-red-700  cursor-pointer'>Delete Account</span>
              <span className='text-red-700 cursor-pointer'>Sign out</span>
             </div>
    </div>
  )
}
