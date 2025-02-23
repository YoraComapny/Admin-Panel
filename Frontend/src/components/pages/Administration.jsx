import { useLocation } from "react-router-dom";
import Location from "../global/Location";
import { useState, useEffect } from "react";
import Portal from "./Portal";
import Circle from "../global/LoadingSemiCircle";
import GeneralSettings from "../AdminSettings/GeneralSettings";
import AppsSocialSettings from "../AdminSettings/AppsSocialSettings";
import ContactInfo from "../AdminSettings/ContactInfo";
import { createAdminSettings, getAdminSettings } from "../../Api";

const Administration = () => {
  const location = useLocation();

  // States
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(1);
  const [general, setGeneral] = useState({});
  const [social, setSocial] = useState({});
  const [contact, setContact] = useState({});
  const [privacy, setPrivacy] = useState({
    privacy_policy: "",
    terms_conditions: "",
  });

  // Handler functions for states
  const handleGeneralChange = (e) => {
    const target = e.target;
    setGeneral({
      ...general,
      [target.name]: target.value,
    });
  };

  const handleSocialChange = (e) => {
    const target = e.target;
    setSocial({
      ...social,
      [target.name]: target.value,
    });
  };
  const handleContactChange = (e) => {
    const target = e.target;
    setContact({
      ...contact,
      [target.name]: target.value,
    });
  };

  const handleChange = (e) => {
    const target = e.target;
    setPrivacy({
      ...privacy,
      [target.name]: target.value,
    });
  };

  // Fetching data at start
  useEffect(() => {
    setLoading(true);
    try {
      getAdminSettings()
        .then((settings) => {
          setGeneral(settings.admin_settings.general_settings);
          setSocial(settings.admin_settings.social_settings);
          setContact(settings.admin_settings.contact_info);
          setPrivacy({
            privacy_policy: settings.admin_settings.privacy_policy,
            terms_conditions: settings.admin_settings.terms_conditions,
          });
        })
        .catch((err) => {
          console.error("Error occurred: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.error("Error occurred: ", err);
      setLoading(false);
    }
  }, []);

  // Collect all data
  const collectSettingsData = () => {
    const setting = {
      company_name: general.company_name,
      site_title: general.site_title,
      time_zone: general.time_zone,
      language: general.language,
      app_logo_url: general.app_logo_url,
      app_icon_url: general.app_icon_url,
      facebook: social.facebook,
      twitter: social.twitter,
      instagram: social.instagram,
      android_app_link: social.android_app_link,
      ios_app_link: social.ios_app_link,
      privacy_policy: privacy.privacy_policy,
      terms_conditions: privacy.terms_conditions,
      phone: contact.phone,
      email: contact.email,
    };

    return setting;
  };

  // Save the settings
  const handleSave = async () => {
    setLoading(true);
    try {
      const data = collectSettingsData();
      const res = await createAdminSettings(data);
      console.log(res);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };
  return (
    <>
      <Portal>
        <div className="min-h-screen bg-gray-100 p-5">
          <Location location={location} />
          <div className="flex flex-col">
            <div className="flex gap-2 mt-5">
              {/********************** SETTINGS SIDEBAR **********************/}
              <div className="flex flex-col w-[20%] gap-2">
                <div
                  className={`p-2 font-semibold text-sm rounded-md shadow-sm transition-colors cursor-pointer ${
                    isActive === 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-800 hover:text-white hover:bg-blue-400"
                  }`}
                  onClick={() => setIsActive(1)}
                >
                  <p>General Settings</p>
                </div>

                <div
                  className={`p-2 font-semibold text-sm  rounded-md shadow-sm transition-color cursor-pointer ${
                    isActive === 2
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-800 hover:text-white hover:bg-blue-400"
                  }`}
                  onClick={() => setIsActive(2)}
                >
                  <p>App & Social Links</p>
                </div>

                <div
                  className={`p-2 font-semibold text-sm  rounded-md shadow-sm transition-color cursor-pointer ${
                    isActive === 3
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-800 hover:text-white hover:bg-blue-400"
                  }`}
                  onClick={() => setIsActive(3)}
                >
                  <p>Contact Information</p>
                </div>

                <div
                  className={`p-2 font-semibold text-sm  rounded-md shadow-sm transition-colors cursor-pointer ${
                    isActive === 4
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-800 hover:text-white hover:bg-blue-400"
                  }`}
                  onClick={() => setIsActive(4)}
                >
                  <p>Privacy Policy</p>
                </div>

                <div
                  className={`p-2 font-semibold text-sm  rounded-md shadow-sm  transition-colors  cursor-pointer ${
                    isActive === 5
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-800 hover:text-white hover:bg-blue-400"
                  }`}
                  onClick={() => setIsActive(5)}
                >
                  <p>Terms & Conditions</p>
                </div>
              </div>
              {/*********************************** INPUT FIELD AREA *****************************/}
              <div className="border-l-2 border-blue-600 w-[80%] bg-white rounded-r-md shadow-md">
                {loading ? (
                  <Circle />
                ) : isActive === 1 ? (
                  <GeneralSettings
                    data={general}
                    childFunction={handleGeneralChange}
                  />
                ) : isActive === 2 ? (
                  <AppsSocialSettings
                    data={social}
                    childFunction={handleSocialChange}
                  />
                ) : isActive === 3 ? (
                  <ContactInfo
                    data={contact}
                    childFunction={handleContactChange}
                  />
                ) : isActive === 4 ? (
                  <div className="w-full flex flex-col m-3">
                    <h2 className="font-semibold">Privacy Policy</h2>
                    <div className="text-sm flex flex-col w-full mx-auto gap-1">
                      <textarea
                        className="mt-2 w-[95%] h-[10rem] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
                        placeholder="Type something here..."
                        name="privacy_policy"
                        value={privacy.privacy_policy}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                ) : isActive === 5 ? (
                  <div className="w-full flex flex-col m-3">
                    <h2 className="font-semibold">Terms & Conditions</h2>
                    <div className="text-sm flex flex-col w-full mx-auto gap-1">
                      <textarea
                        className="mt-2 w-[95%] h-[10rem] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
                        placeholder="Type something here..."
                        name="terms_conditions"
                        value={privacy.terms_conditions}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                className={`p-2 text-sm text-white font-semibold rounded-md shadow-md hover:bg-blue-900 transition active:scale-95 ${
                  loading ? "bg-gray-600 pointer-events-none" : "bg-blue-600"
                }`}
                onClick={handleSave}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Administration;
