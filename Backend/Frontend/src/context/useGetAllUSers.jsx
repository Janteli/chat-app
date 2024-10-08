import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import axios from "axios";

const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);  // Initialize with an empty array, not an object
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
        setAllUsers(response.data.filteredUser);  // Store users as an array
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
