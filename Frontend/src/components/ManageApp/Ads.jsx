import { useEffect, useState } from "react";
import { createUpdateAdSettings, getAdsSettings } from "../../Api.js";
import LoadingSemiCircle from "../global/LoadingSemiCircle.jsx";
import { toast } from "react-toastify";

const Ads = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    ad_status: "active",
    click_control: "5",
    google_adaptive_interstitial_ads: "74d68F8769GF76G68GG999g67g6",
    google_app_id: "7CEec7ee4ewxwx7EC475G457",
    google_app_open_ads: "67ff8Ff8gv8f75565889T7F6",
    google_banner_ads: "74DVf8f858699F6GG",
    google_interstitial_ads: "87df8gg6fg6f6F5856F586dff58",
    google_native_ads: "346XD8G97978g77898h78h",
    google_rewarded_ads_code: "r86D66FF7fg7tg68679df5734rtvy67H",
  });
  useEffect(() => {
    setLoading(true);
    try {
      getAdsSettings()
        .then((settings) => {
          const setting = settings.adSettings.android;
          setData({
            ad_status: setting.ad_status || "",
            click_control: setting.click_control || "",
            google_adaptive_interstitial_ads:
              setting.google_adaptive_interstitial_ads || "",
            google_app_id: setting.google_app_id || "",
            google_app_open_ads: setting.google_app_open_ads || "",
            google_banner_ads: setting.google_banner_ads || "",
            google_interstitial_ads: setting.google_interstitial_ads || "",
            google_native_ads: setting.google_native_ads || "",
            google_rewarded_ads_code: setting.google_rewarded_ads_code || "",
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

  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const getValues = () => {
    const values = data;
    return values;
  };
  const handleSave = async () => {
    const fetchData = { android: getValues(), ios: undefined };
    if (!fetchData.android.ad_status || !fetchData.android.click_control) {
      toast.error("Enter required values");
    } else {
      const res = createUpdateAdSettings(fetchData);
      console.log(res);
    }
  };

  return (
    <div className={`w-full p-5 rounded-md`}>
      {/*ADS FORM*/}
      {loading ? (
        <LoadingSemiCircle />
      ) : (
        <form className="w-full flex flex-col gap-2">
          {/*Ads Status and Click Control*/}
          <div className="w-full flex gap-3">
            <div className="w-[50%]">
              <label className="text-xs font-bold">
                Ads Status <span className="text-red-600 font-bold">*</span>
              </label>
              <select
                className="border-2 border-gray-300 rounded-md py-[0.2rem] text-xs focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-[100%]"
                name="ad_status"
                value={data.ad_status}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            {/**/}
            <div className="w-[50%]">
              <label className="text-xs font-bold">
                Click Control <span className="text-red-600 font-bold">*</span>
              </label>
              <select
                className="border-2 border-gray-300 rounded-md py-[0.2rem] text-xs focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-[100%]"
                name="click_control"
                value={data.click_control}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                <option value="off">Off</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>

          {/*Google App ID and App Open Ads Code*/}
          <div className="w-full flex gap-3">
            <div className="w-[50%]">
              <label className="text-xs font-bold">Google App ID</label>
              <input
                type="text"
                name="google_app_id"
                className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
                placeholder="Enter some value..."
                value={data.google_app_id}
                onChange={handleChange}
              />
            </div>

            <div className="w-[50%]">
              <label className="text-xs font-bold">
                Google App Open Ads Code
              </label>
              <input
                type="text"
                name="google_app_open_ads"
                className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
                placeholder="Enter some value..."
                value={data.google_app_open_ads}
                onChange={handleChange}
              />
            </div>
          </div>

          {/*Google Banner Ads & Google Interstitial Ads Code*/}
          <div className="w-full flex gap-3">
            <div className="w-[50%]">
              <label className="text-xs font-bold">
                Google Banner Ads Code
              </label>
              <input
                type="text"
                name="google_banner_ads"
                className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
                placeholder="Enter some value..."
                value={data.google_banner_ads}
                onChange={handleChange}
              />
            </div>

            <div className="w-[50%]">
              <label className="text-xs font-bold">
                Google Interstitial Ads Code
              </label>
              <input
                type="text"
                name="google_interstitial_ads"
                className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
                placeholder="Enter some value..."
                value={data.google_interstitial_ads}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Google Adaptive & Google Native Ads Code */}
          <div className="w-full flex gap-3">
            <div className="w-[50%]">
              <label className="text-xs font-bold">
                Google Adaptive Interstitial Ads Code
              </label>
              <input
                type="text"
                name="google_adaptive_interstitial_ads"
                className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
                placeholder="Enter some value..."
                value={data.google_adaptive_interstitial_ads}
                onChange={handleChange}
              />
            </div>

            <div className="w-[50%]">
              <label className="text-xs font-bold">
                Google Native Ads Code
              </label>
              <input
                type="text"
                name="google_native_ads"
                className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
                placeholder="Enter some value..."
                value={data.google_native_ads}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Google Rewarded Ads Code */}
          <div className="w-full">
            <div className="w-[100%]">
              <label className="text-xs font-bold">
                Google Rewarded Ads Code
              </label>
              <input
                type="text"
                name="google_rewarded_ads_code"
                className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
                placeholder="Enter some value..."
                value={data.google_rewarded_ads_code}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      )}

      <div className="w-full flex justify-end">
        <button
          className="text-sm my-4 font-semibold right-12 bottom-5 bg-blue-600 py-2 px-4 text-white uppercase hover:bg-blue-800 transition active:scale-95 rounded-md shadow-lg"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Ads;
