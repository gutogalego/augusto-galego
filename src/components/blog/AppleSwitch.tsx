import { useState } from "react";

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const AppleSwitch: React.FC<SwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`flex h-6 w-12 cursor-pointer items-center rounded-full bg-gray-300 p-1 duration-300 ease-in-out ${
        isOn ? "justify-end" : "justify-start"
      }`}
    >
      <div className="h-5 w-5 transform rounded-full bg-white shadow-md duration-300 ease-in-out"></div>
    </div>
  );
};

export default AppleSwitch;
