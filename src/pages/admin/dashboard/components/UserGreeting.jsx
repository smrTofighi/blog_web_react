import moment from "moment";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
const UserGreeting = () => {
    const {user}= useContext(UserContext)
  return (
    <>
      <h2 className="text-xl md:text-2xl font-medium">
        Good Morning! {user.name}
      </h2>
      <p className="text-xs md:text-[13px] font-medium text-gray-400 mt-1.5">
        {moment().format("dddd MMM YYYY")}
      </p>
    </>
  );
};

export default UserGreeting;
