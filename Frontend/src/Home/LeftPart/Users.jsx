import React from "react";
import User from "./User";
import useGetAllUSers from "../../context/useGetAllUSers";

const Users = () => {
  const [allUsers, loading] = useGetAllUSers()
  // console.log("allUser",allUsers)
   return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-600 rounded-md">
        Messages
      </h1>
      <div className="py-2 flex-1 overflow-y-auto" style={{ maxHeight: "calc(81vh - 10vh)" }}>
      {
  allUsers && allUsers.length > 0 ? (
    allUsers.map((user, index) => <User key={index} user={user} />)
  ) : (
    <p>No users found.</p>
  )
}
      </div>
    </div>
  );
};

export default Users;
