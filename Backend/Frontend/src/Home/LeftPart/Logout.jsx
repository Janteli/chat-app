import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi"
import axios from "axios"
import Cookies from "js-cookie"
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const Logout = () => {
  const [loading, setLoading] = useState(false)
  // const navigate = useNavigate(); // Use the useNavigate hook
  const handleLogout = async () =>{
    setLoading(true)
    try {
      const res = await axios.post("/api/user/signout")
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt")
      setLoading(false)
      toast.success("Logged Out Succeffully")
      // navigate('/login'); // Use the navigate function for navigation
      window.location.reload()
    } catch (error) {
      console.log("Error in Logout", error)
    }
  }
  return (
<div className="h-[10vh] bg-slate-800">
    <Link to ={'/login'}>
        <BiLogOutCircle className="text-6xl text-white hover:bg-slate-700 duration-200 cursor-pointer rounded-full px-2 ml-2 mt-2"
        onClick={handleLogout}
        />
    </Link>
</div>
  );
};

export default Logout;
