import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Contact({listing}) {
    const [articraft,setArticraft] = useState(null);
    const [message,setMessage] =useState('')

    const onChange=(e)=>{
        setMessage(e.target.value);
    }

    useEffect(()=>{
        const fetchArticraft = async()=>{
            try{
                const res = await fetch(`/api/user/${listing.userRef}`);
                    const data = await res.json();
                    setArticraft(data);
            }catch(error){
                console.log(error)
            }
        }
        fetchArticraft();

    },[listing.userRef])
  return (
    <>
    {articraft &&(
        <div className="flex flex-col gap-2">
            <p className="text-lg">Contact <span className="font-semibold">
                {articraft.username}</span> for <span 
                className="font-semibold text-xl">{listing.name}</span></p>
                <textarea 
                name="Message" 
                id="message" 
                cols="" 
                rows="2" 
                value={message} 
                onChange={onChange}
                placeholder="Enter your message here..."
                style={{border:'1px solid black'}}
                className="w-full border p-3 rounded-lg"
                ></textarea>

                <Link
                to={`mailto:${articraft.email}?subject=Regarding ${listing.name}&body=${message}`}
                className="bg-red-600 text-white 
                rounded-lg uppercase p-3  hover:bg-red-500">Send message...</Link>
        </div>
    )}
    </>
  )
}
