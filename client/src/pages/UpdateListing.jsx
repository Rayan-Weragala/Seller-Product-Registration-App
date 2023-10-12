import { useState } from 'react';
import {getDownloadURL,ref,getStorage,uploadBytesResumable} from 'firebase/storage'
import{app} from '../firebase'
import {useSelector} from 'react-redux'
import {useNavigate,useParams} from 'react-router-dom'
import { useEffect } from 'react';

export default function CreateListing() {

  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [error,setError] = useState(false)
  const [loading,setLoading] =useState(false)
  const {curruntUser} =useSelector(state =>state.user)
  const navigate = useNavigate();
  const params =useParams();
  const options = [
    { value: '1', label: 'Paintings' },
    { value: '2', label: 'Sculptures' },
    { value: '3', label: 'Ceramics and Pottery' },
    { value: '4', label: 'Jewelry' },
    { value: '5', label: 'Textiles and Fabrics' },
    { value: '6', label: 'Paper craft' },
    { value: '7', label: 'Wood craft' },
    { value: '8', label: 'Glass craft' },
    { value: '9', label: 'Leather craft' },
    { value: '10', label: 'Metal craft' },
    { value: '11', label: 'Traditional craft' },
    { value: '12', label: 'Prints and Posters'},
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({ ...formData, category: event.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const [files,setFiles] = useState([])
  const [formData,setFormData]=useState({
    imageUrls:[],
    name:'',
    description:'',
    materials: '',
    category: '',
    price: 50,
    discount:'0',
    height: '',
    width: '',
    depth: '',
    stock: '',
  })
  
  const [imageUploadError,setimageUploadError]=useState(false);
  const[uploading,setuploading] =useState(false);

  useEffect(()=>{
    const fetchListing =async ()=>{
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`)
        const data = await res.json();
        if(data.success===false){
            console.log(data.message);
            return;
        }
        setFormData(data);
    }
    fetchListing();
  },[]);

  const handleImageSubmit = (e)=>{
    if(files.length>0 && files.length+formData.imageUrls.length <7){
      setuploading(true);
      setimageUploadError(false)
      const promises =[];
      for(let i=0;i<files.length;i++){
        promises.push(storeImage(files [i]));
      }
      Promise.all(promises).then((urls)=>{
        setFormData({...formData,imageUrls:formData.imageUrls.concat(urls),
        })
        setimageUploadError(false);
        setuploading(false);
      }).catch((err)=>{
        setimageUploadError('Image upload failed(5 mb max per image)');
        setuploading(false)
      });
    }else{
      setimageUploadError("You can only upload 6 images per listing")
      setuploading(false)
    }
  }
  const storeImage = async(file) =>{
    return new Promise((resolve, reject)=>{
      const storage = getStorage(app);
      const fileName = new Date().getTime()+file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        "state_changed",
        (snapshot)=>{
          const progress =
          (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log(`upload is ${progress}% done`);
        },
        (error)=>{
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL)
          })
        }
      )
    });
  }
 const handleRemoveImage = (index)=>{
  setFormData({
    ...formData,
    imageUrls:formData.imageUrls.filter((_,i)=>i!==index),
  })
 }
  
 const handleChange = (e) => {
  if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  } else if (e.target.type === 'checkbox') {
    setFormData({
      ...formData,
      [e.target.id]: e.target.checked,
    });
  }
};

 const handleSubmit = async (e)=>{
  e.preventDefault();
  try{
    if(formData.imageUrls.length<1) return setError('You must upload at least one image!')
    if(+formData.price< +formData.discount) return setError('Discount price must be lower than regular price')
    setLoading(true)
    setError(true)
    const res = await fetch (`/api/listing/update/${params.listingId}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        ...formData,
        userRef:curruntUser._id,
      }),
    });
    const data = await res.json();
    setLoading(false)
    if(data.success ===false){
      setError(data.message)
    }
    navigate(`/listing/${data._id}`);
  }catch(error){
    setError(error.message)
    setLoading(false);
   
  }
 }
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">Update Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4" >
        {step === 1 && (
          <div className="border rounded-lg  p-4">
            <h2 className="text-xl font-semibold">Product Details</h2>
            <label htmlFor="name" className="block mt-3  text-slate-950">
            Product Name:
          </label>
          <input
            type="text"
            className="border p-2 rounded-lg w-full"
            id="name"
            maxLength="60"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />

          <label htmlFor="description" className="block text-slate-950 mt-4">
            Product Description:
          </label>
          <textarea
            className="border p-2 rounded-lg w-full"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <label htmlFor="materials" className="block text-slate-950 mt-4">
            Materials Used:
          </label>
          <input
            type="text"
            className="border p-2 rounded-lg w-full"
            id="materials"
            required
            onChange={handleChange}
            value={formData.materials}
          />

          <label htmlFor="dropdown" className="block text-slate-950 mt-4">
            Select a Category:
          </label>
          <select
            id="category"
            name="dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
            className="border p-2 rounded-lg w-full"
          >
            <option value="">Select a Category</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="offer" className="block text-slate-950 mt-4">
              Offer:
            </label>
            <input
              type="checkbox"
              id="offer"
              onChange={handleChange}
              checked={formData.offer}
            />
          <label htmlFor="price" className="block text-slate-950 mt-4">
            Regular Price:
          </label>
          <input
            type="number"
            className="border p-2 rounded-lg w-full"
            id="price"
            min='50'
            max='5000'
            required
            onChange={handleChange}
            value={formData.price}
          />
          {formData.offer && (
            <div>
              <label htmlFor="price" className="block text-slate-950 mt-4">
              Discounted Price:
              </label>
              <input
              type="number"
              className="border p-2 rounded-lg w-full"
              id="discount"
              min='0'
              max='5000'
              required
              onChange={handleChange}
              value={formData.discount}
              />
              </div>
          )}
        
          <label htmlFor="stock" className="block text-slate-950 mt-4">
          Stock Number:
          </label>
          <input
          type="number"
          className="border p-2 rounded-lg w-full"
          id="stock"
          required
          onChange={handleChange}
          value={formData.stock}
        />
            <button
              onClick={nextStep}
              className="p-3 mt-3 bg-teal-700 text-white rounded-lg uppercase"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">Images (max 6)</h2>
            <div>
            <input
             onChange={(e)=>setFiles(e.target.files)}
            className="border p-2 mt-3 rounded-lg w-full"
            type="file"
            id="images"
            accept="image/*"
            multiple
          />
          <button type='button' disabled={uploading} onClick={handleImageSubmit} className='p-3 text-black uppercase hover:underline rounded-lg font-bold'>{uploading ? 'Uploading...':'Upload'}</button>
          <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
          {
          formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
            <div key={url} className='flex justify-between p-3 border items-center'>
              <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
              <button onClick={() => handleRemoveImage(index)} className='p-3 text-green-700 rounded-lg uppercase hover:font-bold'>Delete</button>
            </div>
          ))
        }



          </div>
            <button
              onClick={prevStep}
              className="p-3 mt-3 bg-gray-300 text-gray-700 rounded-lg uppercase mr-2"
            >
              Previous
            </button>
           
            <button
              onClick={nextStep}
              className="p-3 mt-3 bg-teal-700 text-white rounded-lg uppercase"
            >
              Next
            </button>
           
          </div>
          
        )}

        {step === 3 && (
          <div className="border rounded-lg p-4">
            <h2 className="text-xl mt-3 font-semibold">Product Dimensions</h2>
            <div className="flex flex-col space-y-2 mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="height"
                min="1"
                max="10"
                required
                className="border p-2 rounded-lg w-1/2"
                onChange={handleChange}
                value={formData.height}
              />
              <p>Height (inches)</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="width"
                min="1"
                max="10"
                required
                className="border p-2 rounded-lg w-1/2"
                onChange={handleChange}
                value={formData.width}
              />
              <p>Width (inches)</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="depth"
                min="1"
                max="10"
                required
                className="border p-2 rounded-lg w-1/2"
                onChange={handleChange}
                value={formData.depth}
              />
              <p>Depth (inches)</p>
            </div>
          </div>
            <button
              onClick={prevStep}
              className="p-3 bg-gray-300 text-gray-700 rounded-lg uppercase mr-2"
            >
              Previous
            </button>
            <button disabled={loading ||uploading}
              type="submit"
              className="p-3 mt-3 bg-teal-700 text-white rounded-lg uppercase"
            >
              {loading ? 'Updating...':'Update product'}
            </button>
            {error && <p className='text-red-700 tex-sm'>{error}</p>}
          </div>
        )}
      </form>
    </main>
  );
}

