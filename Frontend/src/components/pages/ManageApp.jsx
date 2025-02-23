import Accordion from "../ManageApp/Accordian";
import { useLocation } from "react-router-dom";
import Location from "../global/Location";
import Portal from "./Portal";
import { IoLogoAndroid } from "react-icons/io";
const ManageApp = () => {
  const location = useLocation();
  const contentList = [
    // Add your content for each accordion item here
    {
      title: "App Information",
      form: "AppInformation",
      img: "https://placehold.jp/300x300.png",
    },
    {
      title: "Mobile App Settings",
      form: "AndroidSettings",
      img: "https://placehold.jp/300x300.png",
    },
    // {
    //   title: "iOS Settings",
    //   form: "iOSSettings",
    //   img: "https://placehold.jp/300x300.png",
    // },
    {
      title: "Android Ads Control",
      form: "AndroidAdsControl",
      img: "https://placehold.jp/300x300.png",
    },
    {
      title: "iOS Ads Control",
      form: "iOSAdsControl",
      img: "https://placehold.jp/300x300.png",
    },
    {
      title: "Block Countries",
      form: "BlockCountries",
      img: "https://placehold.jp/300x300.png",
    },
  ];
  return (
    <>
      <Portal>
        <div className="bg-gray-200 min-h-screen">
          <div className="relative p-3">
            <div className="py-3 w-[90%] mx-auto">
              <Location location={location} />
            </div>
            <div className="py-3 w-[90%] mx-auto">
              <h2 className="font-semibold text-xl">Manage App Settings</h2>
            </div>
            <div className="flex flex-col gap-5 w-[90%] mx-auto bg-white p-3 rounded-md shadow-md">
              {contentList.map((item, index) => (
                <div key={index} className="rounded-md">
                  <Accordion title={item.title} form={item.form} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default ManageApp;
