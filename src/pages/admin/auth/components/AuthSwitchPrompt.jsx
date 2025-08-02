import React from 'react'

const AuthSwitchPrompt = ({
  promptText,
  actionText,
  onActionClick,
}) => {
  return (
    <p className="text-[13px] text-slate-800 mt-3">
      {promptText}{" "}
      <button
        className="font-medium text-primary underline cursor-pointer"
        onClick={onActionClick}
      >
        {actionText}
      </button>
    </p>
  );
};

export default AuthSwitchPrompt