import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
    const {user,clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = ()=>{
        localStorage.clear();
        clearUser();
        navigate('/');
    }
   console.log(user);
   
    
  return (
    user && (
      <div className="flex items-center">
        <img
          src={user.profileImageUrl}
          alt={user.name}
          className="w-11 h-11 bg-gray-300 rounded-full mr-3"
        />
        <div>
          <div className="text-[15px] text-black font-bold leading-3">
            {user.name || ""}
          </div>
          <button
            className="text-sky-600 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
}

export default ProfileInfoCard