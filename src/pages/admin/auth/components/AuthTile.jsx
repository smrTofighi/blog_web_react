import React from "react";

const AuthTile = ({title, description}) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="text-xs text-slate-700 mt-[2px] mb-6">
        {description}
      </p>
    </div>
  );
};

export default AuthTile;
