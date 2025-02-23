import { useState } from "react";
import SettingForms from "./SettingForms";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { FaAppStoreIos } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { SiGoogleads } from "react-icons/si";
import { MdBlock } from "react-icons/md";

const Accordion = ({ title, form }) => {
  const getImgComponent = () => {
    if (title === "Mobile App Settings") {
      return <MdOutlineAppSettingsAlt className="h-10 w-10" />;
    } else if (title === "App Information") {
      return <FaAppStoreIos className="w-10 h-10" />;
    } else if (title === "Android Ads Control") {
      return <SiGoogleads className="h-10 w-10" />;
    } else if (title === "iOS Ads Control") {
      return <FaApple className="h-10 w-10" />;
    } else if (title === "Block Countries") {
      return <MdBlock className="h-10 w-10" />;
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => setIsOpen(!isOpen);

  return (
    <div className="accordion shadow-sm">
      <div
        className={`rounded-md flex justify-between items-center p-2 cursor-pointer bg-gray-200 hover:bg-gray-300 hover:rounded-md transition ${
          isOpen ? "text-blue-600" : "text-black"
        }`}
        onClick={toggleContent}
      >
        <div className="flex gap-5 items-center">
          {getImgComponent()}
          <h2 className="font-semibold mt-1">{title}</h2>
        </div>
        <span
          className={`text-3xl font-bold icon transition duration-300 ease-in-out transform rotate-0 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          +
        </span>
      </div>
      {isOpen && (
        <div className="p-3 bg-white rounded-md m-1 border shadow-sm border-gray-200">
          <SettingForms form={form} />
        </div>
      )}
    </div>
  );
};

export default Accordion;
