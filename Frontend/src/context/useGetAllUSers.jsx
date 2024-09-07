import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import axios from "axios";

const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState({ filteredUser: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allusers", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data.filteredUser);  // Ensure you set the entire response data
        setLoading(false);
      } catch (error) {
        console.log("Error in get all users: " + error);
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return [allUsers, loading];
};

export default useGetAllUsers;
