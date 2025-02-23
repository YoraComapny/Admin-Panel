import { useState } from "react";
import Location from "../global/Location";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SunEditor from "suneditor-react";
import "../../../node_modules/suneditor/dist/css/suneditor.min.css";
import { createNews } from "../../Api";
import { toast } from "react-toastify";
import Portal from "../pages/Portal";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";

const AddNews = () => {
  const location = useLocation();
  // Creating a state to check if title input exists
  const [file, setFile] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [imageType, setImageType] = useState("");
  const [data, setData] = useState({
    title: "",
    category: "",
    source_type: {
      other: {
        source_name: "",
        source_url: "",
      },
      own: {
        my_article: "",
      },
    },
    image_url: "",
    publish_date: "",
    status: "",
  });

  const handleDateChange = (date) => {
    const selectedDateTime = new Date(date);

    // Format the date and time
    const formattedDateTime = selectedDateTime.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Include AM/PM indicator
    });
    setData({ ...data, publish_date: formattedDateTime });
  };

  const [dragging, setDragging] = useState(false);
  const navigation = useNavigate();

  // Handle Drag enter
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
    setFile(files[0]);
  };

  const handleSourceTypeChange = (event) => {
    setSourceType(event.target.value);
  };

  const handleImageTypeChange = (event) => {
    setImageType(event.target.value);
  };

  const handlefile = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to submit form data
  const handleSubmit = (data) => {
    // event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append each field in the data object to the formData
    for (let key in data) {
      if (key === "source_type") {
        // Traverse through the nested source_type object
        for (let nestedKey in data[key]) {
          for (let nestedField in data[key][nestedKey]) {
            formData.append(
              `source_type[${nestedKey}][${nestedField}]`,
              data[key][nestedKey][nestedField]
            );
          }
        }
      } else {
        // Append other fields directly
        formData.append(key, data[key]);
      }
    }
    if (file) formData.append("filename", file);
    // console.log(file);

    return formData;
  };

  const handleNews = async (e, values) => {
    e.preventDefault();
    setIsClicked(true);
    // const items = { ...values };
    if (values?.image_url) {
      const res = await createNews(values);
      if (res?.data?.success) {
        toast.success(`${res.data?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigation("/admin/news");
      }
    } else {
      const res = await createNews(handleSubmit(values));
      console.log(res);
      if (res?.data?.success) {
        toast.success(`${res.data?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const handleSourceTypeValue = (type, field, value) => {
    setData((prevData) => ({
      ...prevData,
      source_type: {
        ...prevData.source_type,
        [type]: {
          ...prevData.source_type[type],
          [field]: value,
        },
      },
    }));
  };

  const handleEditorChange = (content) => {
    setData({
      ...data,
      source_type: {
        ...data.source_type,
        own: {
          ...data.source_type.own,
          my_article: content, // Update my_article with editContent
        },
      },
    });
  };

  return (
    <>
      <Portal>
        <div className="bg-gray-100 min-h-screen p-3">
          <div className="w-[95%] m-1 mx-auto">
            <Location location={location} />
          </div>
          <div className="bg-white rounded-md shadow-md w-[95%] mx-auto p-5">
            <h2 className="font-semibold text-lg">Create a News Article</h2>
            <form className="mt-2 p-2 w-full">
              {/*Title Field*/}
              <div className="my-2 font-semibold text-sm">
                <div className="flex gap-3 items-center">
                  <label htmlFor="title">
                    Title <span className="text-red-600">*</span>
                  </label>
                  {data.title.trim() === "" && (
                    <p className="text-red-600 text-xs">{`(Required)`}</p>
                  )}
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Type something here..."
                  className="mt-1 w-full bg-white border border-gray-300 text-gray-700 py-[.435rem] px-2 rounded outline-blue-400"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
              </div>
              {/*category and source type*/}
              <div className="flex gap-5 text-sm">
                <div className="font-semibold w-full">
                  <label htmlFor="category">
                    Category <span className="text-red-600">*</span>
                  </label>
                  {/*category*/}
                  <div className="relative w-full my-2 text-sm cursor-pointer">
                    <select
                      name="category"
                      onChange={(e) =>
                        setData({ ...data, category: e.target.value })
                      }
                      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    >
                      <option value="">Select One</option>
                      <option value="Champions League">
                        UEFA Champions League
                      </option>
                      <option value="Premier League">Premier League</option>
                      <option value="La Liga">La Liga</option>
                    </select>
                    <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {/*source type*/}
                <div className="font-semibold w-full">
                  <label htmlFor="source-type">
                    Source Type <span className="text-red-600">*</span>
                  </label>
                  <div className="relative my-2 text-sm cursor-pointer">
                    <select
                      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      value={sourceType}
                      onChange={handleSourceTypeChange}
                    >
                      <option value="">Select One</option>
                      <option value="Own">Own</option>
                      <option value="Others">Others</option>
                    </select>
                    <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other source fields, only visble if you select source type: others */}
              <div>
                {/* Fields for Image URL Image Drag and Drop */}
                {sourceType === "Others" ? (
                  <div className="mt-3 flex flex-col gap-3">
                    {/* Source name and url fields */}
                    <div className="flex gap-5 text-sm">
                      <div className="font-semibold w-full">
                        <label htmlFor="title">
                          Source Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={data.source_type.other.source_name}
                          onChange={(e) =>
                            handleSourceTypeValue(
                              "other",
                              "source_name",
                              e.target.value
                            )
                          }
                          className="mt-1 p-1 border border-gray-300 outline-blue-400 w-full rounded-md font-normal"
                          placeholder="Source: Own"
                          required
                        />
                      </div>
                      <div className="font-semibold w-full">
                        <label htmlFor="title">
                          Source URL <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={data.source_type.other.source_url}
                          onChange={(e) =>
                            handleSourceTypeValue(
                              "other",
                              "source_url",
                              e.target.value
                            )
                          }
                          className="mt-1 p-1 border border-gray-300 outline-blue-400 w-full rounded-md font-normal"
                          placeholder="Enter source url here..."
                          required
                        />
                      </div>
                    </div>
                  </div>
                ) : sourceType === "Own" ? (
                  <div className="my-2">
                    <label className="font-semibold text-sm">
                      Write Article
                    </label>
                    <SunEditor
                      onChange={handleEditorChange}
                      setOptions={{
                        buttonList: [
                          ["undo", "redo"],
                          ["bold", "underline", "italic", "strike"],
                          ["fontColor", "hiliteColor"],
                          ["align", "list"],
                          ["link", "image"],
                          ["fullScreen", "showBlocks", "codeView"],
                        ],
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* News image type select fields */}
              <div className="my-3 font-semibold w-full text-sm">
                <div className="flex gap-2 items-center">
                  <label htmlFor="category">
                    News Image Type <span className="text-red-600">*</span>
                  </label>
                  {!imageType && (
                    <p className="text-red-600 text-xs">{`(Required)`}</p>
                  )}
                </div>
                <div className="relative text-sm cursor-pointer">
                  <select
                    className="my-2 block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    value={imageType}
                    onChange={handleImageTypeChange}
                  >
                    <option value="">Select One</option>
                    <option value="url">URL</option>
                    <option value="image">Image</option>
                  </select>
                  <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* URL / Image type fields */}
              {imageType === "url" ? (
                <div className="font-semibold text-sm">
                  <label htmlFor="title">
                    Image URL <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    placeholder="Type something here..."
                    className="mt-1 p-1 border border-gray-300 outline-blue-400 w-full rounded-md font-normal"
                    onChange={(e) =>
                      setData({ ...data, image_url: e.target.value })
                    }
                  />
                </div>
              ) : imageType === "image" ? (
                <div
                  id="drag-and-drop"
                  className="w-full bg-white rounded-md p-2 flex flex-col gap-2"
                >
                  <h2 className="text-sm font-semibold">
                    Upload Image <span className="text-red-600">*</span>
                  </h2>
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
                      <p className="text-gray-400 text-center">OR</p>
                      <input
                        type="file"
                        name="filename"
                        onChange={(e) => handlefile(e)}
                        id="filename"
                        className="text-sm text-white bg-blue-600 hover:bg-blue-800 rounded-md p-1 w-3/4"
                      />
                      <p className="text-xs text-orange-500 text-center">
                        Maximum Size: 1MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* Publish Date and other Fields */}
              <div className="mt-3 flex gap-5 text-sm">
                {/* Publish Date of article */}
                <div className="font-semibold text-sm w-full">
                  <label htmlFor="publish-date">
                    Publish Date <span className="text-red-600">*</span>
                  </label>
                  <Flatpickr
                    className="mt-2 border-2 border-gray-300 cursor-pointer w-full py-[.435rem] font-normal px-2 rounded p-1 text-black "
                    options={{
                      enableTime: true,
                      dateFormat: "Y-m-d h:i K",
                    }}
                    value={data.publish_date}
                    onChange={handleDateChange}
                  />
                </div>
                {/* Status of article*/}
                <div className="font-semibold w-full">
                  <label htmlFor="status">
                    Status <span className="text-red-600">*</span>
                  </label>
                  <div className="relative my-2 text-sm cursor-pointer">
                    <select
                      name="status"
                      onChange={(e) =>
                        setData({ ...data, status: e.target.value })
                      }
                      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-8 rounded leading-tight outline-blue-400"
                    >
                      <option value="">Select One</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create Button */}
              <div className="my-2 w-full flex justify-end">
                <Link
                  disabled={isClicked}
                  onClick={(e) => handleNews(e, data)}
                  className=" px-3 py-2 font-semibold text-sm text-white rounded-md shadow cursor-pointer transition-colors bg-green-600 hover:bg-green-900"
                >
                  Create News
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default AddNews;
