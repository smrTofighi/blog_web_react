import React from "react";

const DashboardSummaryCard = ({ icon, label, value, bgColor, color , color2 }) => {
  return <div className='flex items-center gap-3'>
    <div className={`w-10 md:w-8 h-10 md:h-8 flex items-center justify-center ${color} ${bgColor} rounded-sm`}>
        {icon}
    </div>
    <p className={`text-xs md:text-[14px] ${color2}`}>
        <span className={`text-sm md:text-[15px] ${color} font-semibold`}>
            {value}
        </span> {' '} {label}
    </p>
  </div>;
};

export default DashboardSummaryCard;
