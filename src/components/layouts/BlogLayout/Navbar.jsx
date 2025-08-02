import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import LOGO from "../../../assets/logo.png";
import SideMenu from "../SideMenu";
const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button className="block lg:hidden text-black -mt-1" onClick={() => setOpenSideMenu(!openSideMenu)}>
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <img src={LOGO} alt="Vorna Code LOGO" className="h-[40px] md:h-[45px]" />

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
            <SideMenu activeMenu={activeMenu} setOpenSideMenu={setOpenSideMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
