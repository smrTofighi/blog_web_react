import React from "react";
import AUTH_IMG from "../../../../assets/auth-img.png";
const AuthImage = () => {
  return (
    <div className="hidden md:block">
      <img src={AUTH_IMG} alt="Login" className="h-[520px] w-[33vw]" />
    </div>
  );
};

export default AuthImage;
