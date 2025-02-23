import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { getAppInformation, createUpdateAppInformation } from "../../Api";
import LoadingSemiCircle from "../global/LoadingSemiCircle";
import { toast } from "react-toastify";

export const AppInformation = () => {
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [dragging, setDragging] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    appName: "",
    app_unique_id: "",
    sports_api_base_url: "",
    sports_api_key: "",
    ip_api_key: "",
    highlights_type: "disable",
    //status: false,
  });
  // Fetch values at start
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const form = await getAppInformation();
        //setting retrieved data to fields
        setIsToggled(form.settings.status || false);
        setData({
          appName: form.settings.appName || "",
          app_unique_id: form.settings.app_unique_id || "",
          sports_api_base_url: form.settings.sports_api_base_url || "",
          sports_api_key: form.settings.sports_api_key || "",
          ip_api_key: form.settings.ip_api_key || "",
          highlights_type: form.settings.highlights_type || "",
        });
        setPreviewImage(form.settings.app_logo || null);
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        setLoading(false);
      }
    };
    // Call the fetch function
    fetchData();
  }, []);

  // Handle toggle change
  const toggle = () => {
    setIsToggled(!isToggled);
  };
  // initial state values
  const {
    appName,
    app_unique_id,
    sports_api_base_url,
    sports_api_key,
    ip_api_key,
    highlights_type,
  } = data;
  const handlefile = (event) => {
    setFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  // Handlers Drag & Drop enter
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    // console.log(files);
    setFile(files[0]);
    setPreviewImage(URL.createObjectURL(files[0]));
  };

  // Handles changes in any of the form feilds
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function for appending form data to FormData object
  const handleFormData = (values) => {
    if (
      !values.appName ||
      !values.app_unique_id ||
      !values.sports_api_base_url ||
      !values.sports_api_key ||
      !values.ip_api_key
    ) {
      return false;
    } else {
      var formData = new FormData();
      formData.append("appName", values?.appName);
      if (file) formData.append("filename", file);
      formData.append("app_unique_id", values?.app_unique_id);
      formData.append("sports_api_base_url", values?.sports_api_base_url);
      formData.append("sports_api_key", values?.sports_api_key);
      formData.append("ip_api_key", values?.ip_api_key);
      formData.append("highlights_type", values?.highlights_type);
      formData.append("status", isToggled);
      return formData;
    }
  };

  // Submitting / Saving Function
  const handleSave = async (e) => {
    e.preventDefault();
    const val = handleFormData(data);
    if (val) {
      try {
        const res = await createUpdateAppInformation(val);
        console.log(res);
      } catch (error) {
        console.log(error?.message);
      }
    } else toast.error("Enter required fields first");
  };

  return (
    <div className="w-full">
      {loading ? (
        <LoadingSemiCircle />
      ) : (
        <form className="flex flex-col gap-3">
          <div className="flex w-full">
            <div className="w-1/2 m-2">
              <label className="text-sm font-bold">
                App Name <span className="text-red-600">*</span>
              </label>
              <input
                name="appName"
                onChange={handleChange}
                value={appName}
                className="w-full p-1 rounded-md block border-2 border-gray-500"
                type="text"
                placeholder="Zeem Sports"
              />
            </div>
            <div className="w-1/2 m-2">
              <label className="text-sm font-bold">
                App Unique ID <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="app_unique_id"
                onChange={handleChange}
                value={app_unique_id}
                className="w-full p-1 rounded-md block border-2 border-gray-500"
                placeholder="15371eF127AH6wG1618631sM66"
              />
            </div>
          </div>

          <div className="flex justify-around">
            <div className="w-1/2 m-2">
              <label className="text-sm font-bold">
                Sports API Base Url <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="sports_api_base_url"
                onChange={handleChange}
                value={sports_api_base_url}
                className="w-full p-1 rounded-md block border-2 border-gray-500"
                placeholder="https://zeemsports.live/api/football/v3"
              />
            </div>
            <div className="w-1/2 m-2">
              <label className="text-sm font-bold">
                Sport API Key <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="sports_api_key"
                onChange={handleChange}
                value={sports_api_key}
                className="w-full p-1 rounded-md block border-2 border-gray-500"
                placeholder="9a169af32aa04a79b49ad2a7776b26e2"
              />
            </div>
          </div>
          <div className="w-[98%] mx-auto flex justify-between">
            <div className="w-[49%] text-sm">
              <label className="font-bold">
                IP API Key <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                type="text"
                name="ip_api_key"
                className="border-2 block w-[100%] rounded-md border-gray-500 p-1"
                placeholder="WT29xOIs0sf8ZyWwaeyiyRC20ZGtGiGB02Z0eTnwwbO10BoMOe"
                value={ip_api_key}
                onChange={handleChange}
              />
            </div>

            <div className="w-[49%] text-sm">
              <label className="font-bold">Highlights Type</label>
              <select
                className="border-2 border-gray-500 rounded-md py-1 outline-none w-[100%]"
                name="highlights_type"
                value={highlights_type}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                <option value="enable">Enable</option>
                <option value="disable">Disable</option>
                <option value="youtube">YouTube Only</option>
              </select>
            </div>
          </div>

           <div className="p-1">
            <h3 className="my-1 ml-1 text-sm font-bold">App Logo</h3>
            {previewImage ? (
              <div className="bg-gray-200 rounded-md p-3 flex gap-3 items-center">
                <img
                  src={previewImage}
                  alt="app-icon"
                  className="w-[100px] h-[100px] rounded-md"
                />
                <FaTrash
                  onClick={() => {
                    setFile(null);
                    setPreviewImage("");
                  }}
                  className="text-white-600 text-2xl cursor-pointer hover:text-red-500"
                />
              </div>
            ) : (
              <div
                id="drag-and-drop"
                className="w-full bg-white rounded-md p-2 flex flex-col gap-2"
              >
                <div
                  className={`w-full flex justify-center transition-all items-center border-2 border-dashed border-gray-400 rounded-md ${
                    dragging ? "bg-blue-400" : "bg-blue-200"
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col justify-center items-center gap-2 p-2">
                    <h4 className="text-sm font-semibold text-gray-600">
                      Drag & Drop Image here
                    </h4>
                    {file ? (
                      <h4 className="text-sm font-semibold text-gray-600">
                        {file?.name}
                      </h4>
                    ) : null}

                    <p className="text-gray-400 text-center">OR</p>
                    <input
                      type="file"
                      name="upload"
                      id="upload-img"
                      onChange={handlefile}
                      className="text-sm text-white bg-blue-600 hover:bg-blue-800 rounded-md p-1 w-3/4"
                    />
                    <p className="text-xs text-orange-500 text-center">
                      Maximum Size: 1MB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-2">
            <label className="font-bold text-sm">Status</label>
            <input
              name="status"
              onChange={() => toggle()}
              //value={toggle}
              type="checkbox"
              id="switch"
              checked={isToggled}
            />
            <label htmlFor="switch" id="toggle-btn">
              Toggle
            </label>
          </div> 

          <div className="flex justify-end">
            <button
              className="text-sm my-4 font-semibold right-12 bottom-5 bg-blue-600 py-2 px-4 text-white uppercase hover:bg-blue-800 transition active:scale-95 rounded-md shadow-lg"
              onClick={(e) => handleSave(e)}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
