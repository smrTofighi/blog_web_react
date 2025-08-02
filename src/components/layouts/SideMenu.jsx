import { BLOG_NAVBAR_DATA, SIDE_MENU_DATA } from "../../utils/Data";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../cards/CharAvatar";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
const SideMenu = ({ activeMenu, isBlogMenu, setOpenSideMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = (route) => {
    if (route == "logout") {
      handleLogout();
      return;
    }
    navigate(route);
    setOpenSideMenu((prev) => !prev);
  };

  const handleLogout = () => {
    clearUser();
    navigate("/");
    setOpenSideMenu((prev) => !prev);
  };
 
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5">
      {user && (
        <div className="flex flex-col items-center gap-1 mt-3 mb-7">
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl || ""}
              alt="Profile Image"
              className="w-20 h-20 bg-slate-400 rounded-full"
            />
          ) : (
            <CharAvatar
              fullName={user?.name || ""}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}
          <div>
            <h5 className="text-gray-950 font-semibold text-center leading-6 mt-1">
              {user.name || ""}
            </h5>
            <p className="text-[13px] font-medium text-gray-800 text-center">
              {user?.email || ""}
            </p>
          </div>
        </div>
      )}
      {(isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA).map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label
              ? "text-white bg-linear-to-r from-sky-500 to-cyan-400"
              : ""
          } py-3 px-6 rounded-lg mb-3 cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-lg" />
          {item.label}
        </button>
      ))}
      {user && (
        <button
          className="w-full flex items-center gap-4 text[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer"
          onClick={handleLogout}
        >
         
          <LuLogOut className="text-lg" />
            Logout
        </button>
      )}
    </div>
  );
};

export default SideMenu;
