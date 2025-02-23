import Location from "../global/Location";
import { useEffect, useState } from "react";
import { createMatch } from "../../Api.js";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import Portal from "../pages/Portal.jsx";
import { toast } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import moment from "moment-timezone";
import { getThumbnail } from "../../Api.js";

const CreateMatch = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const defaultPortraitWatermark = {
    top: 1.1,
    bottom: null,
    left: null,
    right: 1.1,
    height: 2.0,
    width: 10.0,
    image: "http://windfootball.com/logo/logo1.png",
  };

  const [localDate, setLocalDate] = useState("");
  const [data, setData] = useState({
    sport_type: "",
    league_type: "",
    match_title: "",
    match_time: "",
    fixture_id: "",
    hot_match: false,
    status: "active",
    team_one: {
      name: "",
      image: "",
    },
    team_two: {
      name: "",
      image: "",
    },
    streaming_source: [
      {
        streaming_title: "Server SD",
        is_premium: false,
        resolution: "480p",
        platform: "both",
        portrait_watermark: JSON.stringify(defaultPortraitWatermark, null, 2),
        landscape_watermark: JSON.stringify(defaultPortraitWatermark, null, 2),
        status: "active",
        stream_type: "",
        stream_url: "",
        stream_thumbnail: "",
      },
    ],
  });

  // Populate values of search params if they exist
  useEffect(() => {
    setLoading(true);
    const searchParams = new URLSearchParams(location.search);
    if (searchParams) {
      const id = searchParams.get("id");
      const date = searchParams.get("date");
      const homeName = searchParams.get("homeName");
      const homeLogo = searchParams.get("homeLogo");
      const awayName = searchParams.get("awayName");
      const awayLogo = searchParams.get("awayLogo");
      const matchTitle = searchParams.get("matchTitle");
      const sports = searchParams.get("sports");

      setData((prevData) => ({
        ...prevData,
        sport_type: sports || prevData.sport_type,
        match_title: matchTitle || prevData.match_title,
        match_time: date || prevData.match_time,
        league_type: "international",
        fixture_id: id || prevData.fixture_id,
        team_one: {
          ...prevData.team_one,
          name: homeName || prevData.team_one.name,
          image: homeLogo || prevData.team_one.image,
        },
        team_two: {
          ...prevData.team_two,
          name: awayName || prevData.team_two.name,
          image: awayLogo || prevData.team_two.image,
        },
      }));
    }
    setLoading(false);
  }, [location.search]);

  const {
    sport_type,
    league_type,
    match_title,
    fixture_id,
    hot_match,
    status,
    team_one,
    team_two,
    //streaming_source,
  } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTeamChange = (team, e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [team]: {
        ...prevState[team],
        [name]: value,
      },
    }));
  };

  const navigation = useNavigate();

  // set date handler
  const handleDateChange = (selectedDates) => {
    if (selectedDates.length > 0) {
      const utcDate = moment(selectedDates[0]).utc();
      setLocalDate(utcDate.toDate());
      setData((prevData) => ({
        ...prevData,
        match_time: utcDate.toISOString(),
      }));
    }
  };

  // ... (keep other functions)

  // scroll to top button
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleStreamingChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStreamingSources = [...data.streaming_source];
    updatedStreamingSources[index][name] = value;
    setData({
      ...data,
      streaming_source: updatedStreamingSources,
    });
  };

  const addStreamingSource = (e) => {
    e.preventDefault();
    setData({
      ...data,
      streaming_source: [
        ...data.streaming_source,
        {
          streaming_title: "Server SD",
          is_premium: false,
          resolution: "480p",
          platform: "both",
          portrait_watermark: JSON.stringify(defaultPortraitWatermark, null, 2),
          landscape_watermark: JSON.stringify(
            defaultPortraitWatermark,
            null,
            2
          ),
          status: "active",
          stream_type: "",
          stream_url: "",
        },
      ],
    });
  };

  const formatTime = (time) => {
    return moment.utc(time).format("YYYY-MM-DD HH:mm:ss [UTC]");
  };

  const validateFields = () => {
    const validationArray = [];

    if (data?.sport_type === "") {
      validationArray.push("Sport Type");
    }
    if (data?.match_title === "") {
      validationArray.push("Match Title");
    }
    if (data?.league_type === "") {
      validationArray.push("League Type");
    }
    if (data?.match_time === "") {
      validationArray.push("Match Time");
    }
    if (data?.team_one.name === "") {
      validationArray.push("Team One");
    }
    if (data?.team_two.name === "") {
      validationArray.push("Team Two");
    }

    if (validationArray.length !== 0)
      return { status: false, data: validationArray };

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);

    const validationStatus = validateFields();
    if (validationStatus !== true && !validationStatus.status) {
      const missing = validationStatus.data.join(", ");
      toast.error(`Missing fields: ${missing}`);
      setLoading(false);
      // commit change for second time
      return false;
    }
    try {
      const thumbdata = {
        logo1: data.team_one.image,
        name1: data.team_one.name,
        logo2: data.team_two.image,
        name2: data.team_two.name,
        time: formatTime(data.match_time),
      };

      const thumbnail = await getThumbnail(thumbdata);

      if (!thumbnail) {
        toast.error(
          `Thumbnail generation error, please check your team logo links`
        );
        setLoading(false);
        return false;
      }
      const newData = { ...data, thumbnail: thumbnail };

      const res = await createMatch(newData);
      if (res?.data?.success) {
        toast.success(`${res?.data?.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigation("/admin/manage-live");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.message);
    }
  };

  return (
    <>
      <Portal>
        <div className="relative w-full">
          <div className="h-max w-[95%]mx-auto bg-gray-100 rounded-md p-3">
            <h2 className="py-2">
              <Location location={location} />
            </h2>
            <form
              action="submit"
              id="match-info"
              className="w-full bg-white rounded-md p-2"
            >
              <h2 className="font-bold text-lg p-1">Match Information</h2>

              <div className="flex gap-5 w-full">
                <div className="p-2 w-1/2">
                  <label htmlFor="sports-type" className="text-xs font-bold">
                    Sports Type <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <select
                      className="border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                      name="sport_type"
                      value={sport_type}
                      onChange={handleChange}
                    >
                      <option value="">Select a Sport</option>
                      <option value="football">Football</option>
                      <option value="sports">Sports</option>
                    </select>
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <label htmlFor="sports-type" className="text-xs font-bold">
                    League Type <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 text-xs">
                    <select
                      className="border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full text-sm"
                      name="league_type"
                      value={league_type}
                      onChange={handleChange}
                    >
                      <option value="">Select a League</option>
                      <option value="international">International</option>
                      <option value="la-liga">La Liga</option>
                      <option value="bundesliga">Bundesliga</option>
                      <option value="ligue-1">Ligue 1</option>
                      <option value="serie-a">Serie A</option>
                      <option value="pro-league">Pro League</option>
                      <option value="premier-league">Premier League</option>
                      <option value="uefa-champions-league">
                        UEFA Champions League
                      </option>
                      <option value="major-league-soccer">
                        Major League Soccer
                      </option>
                      <option value="uefa-europa-league">
                        UEFA Europa League
                      </option>
                      <option value="fifa-club-world-cup">
                        FIFA Club World Cup
                      </option>
                      <option value="fa-cup">FA Cup</option>
                      <option value="copa-del-ray">Copa Del Ray</option>
                      <option value="uefa-super-cup">UEFA Super Cup</option>
                      <option value="euro-championship">
                        EURO Championshiip
                      </option>
                      <option value="fifa-world-cup">FIFA World Cup</option>
                      <option value="arab-club-champions-cup">
                        Arab Club Champions Cup
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 w-full">
                <div className="p-2 w-[33.3%]">
                  <label htmlFor="sports-type" className="text-xs font-bold">
                    Match Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full block p-1 rounded-md border-2 border-gray-200"
                    name="match_title"
                    value={match_title}
                    onChange={handleChange}
                  />
                </div>

                <div className="p-2 w-[33.3%] relative">
                  <label htmlFor="sports-type" className="text-xs font-bold">
                    Match Time <span className="text-red-500">*</span>
                  </label>
                  <Flatpickr
                    className="border-2 border-gray-300 cursor-pointer w-full rounded-md p-1 text-black"
                    options={{
                      enableTime: true,
                      dateFormat: "Z",
                      time_24hr: true,
                      utc: true,
                    }}
                    value={localDate}
                    onChange={handleDateChange}
                  />
                  {localDate && (
                    <p className="text-xs mt-1">
                      Selected UTC time:{" "}
                      {moment.utc(localDate).format("YYYY-MM-DD HH:mm")} UTC
                    </p>
                  )}
                </div>

                <div className="p-2 w-[33.3%]">
                  <label htmlFor="sports-type" className="text-xs font-bold">
                    Fixture ID
                  </label>
                  <input
                    type="text"
                    className="w-full block p-1 rounded-md border-2 border-gray-300"
                    name="fixture_id"
                    value={fixture_id}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-5">
                <div className="p-2 w-1/2">
                  <label htmlFor="sports-type" className="text-xs font-bold">
                    Is Hot Match? <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <select
                      className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                      name="hot_match"
                      value={hot_match}
                      onChange={handleChange}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <label htmlFor="sports-type" className="text-xs font-bold">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <select
                      className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                      name="status"
                      value={status}
                      onChange={handleChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>

            <form
              action="submit"
              className="mt-3 w-full bg-white rounded-md px-2 py-4 flex"
            >
              <div className="p-3 border-r-2 border-gray-200 w-1/2">
                <h2 className="font-bold text-lg mb-4">Team One</h2>
                <label htmlFor="sports-type" className="text-xs font-bold">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full block p-1 rounded-md border-2 border-gray-200"
                  name="name"
                  value={team_one.name}
                  onChange={(e) => handleTeamChange("team_one", e)}
                />

                <label htmlFor="sports-type" className="text-xs font-bold">
                  Image URL
                </label>
                <input
                  type="text"
                  className="w-full block p-1 rounded-md border-2 border-gray-200"
                  name="image"
                  value={team_one.image}
                  onChange={(e) => handleTeamChange("team_one", e)}
                />
              </div>

              <div className="p-3 w-1/2">
                <h2 className="font-bold text-lg mb-4">Team Two</h2>
                <label className="text-xs font-bold">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full block p-1 rounded-md border-2 border-gray-200"
                  name="name"
                  value={team_two.name}
                  onChange={(e) => handleTeamChange("team_two", e)}
                />

                <label className="text-xs font-bold">Image URL</label>
                <input
                  type="text"
                  className="w-full block p-1 rounded-md border-2 border-gray-200"
                  name="image"
                  value={team_two.image}
                  onChange={(e) => handleTeamChange("team_two", e)}
                />
              </div>
            </form>

            <div className="flex gap-y-5 w-full">
              <div className="w-full flex justify-end flex-col py-10">
                {data.streaming_source.map((streaming, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-2 border-2 border-gray-200 rounded-md"
                  >
                    <form
                      action="submit"
                      className="mt-3 w-full bg-white rounded-md px-2 py-4 flex flex-col"
                    >
                      <h2 className="text-lg font-bold p-1">
                        Streaming Source
                      </h2>
                      <div className="flex flex-col p-2 border-2 border-gray-200 rounded-md">
                        <p className="p-1 text-blue-700 text-sm font-bold">
                          Streaming Source: {index + 1}
                        </p>
                        <div className="p-3 flex gap-5 w-full">
                          <div className="w-1/2">
                            <label
                              htmlFor="sports-type"
                              className="text-xs font-bold"
                            >
                              Streaming Title
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full block p-1 rounded-md border-2 border-gray-200"
                              name="streaming_title"
                              value={streaming.streaming_title}
                              onChange={(e) => handleStreamingChange(e, index)}
                            />
                          </div>

                          <div className="w-1/2">
                            <label
                              htmlFor="sports-type"
                              className="text-xs font-bold"
                            >
                              Is Premium?
                              <span className="text-red-500">*</span>
                            </label>
                            <div>
                              <select
                                className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                                name="is_premium"
                                value={streaming.is_premium}
                                onChange={(e) =>
                                  handleStreamingChange(e, index)
                                }
                              >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 flex gap-5">
                          <div className="w-1/2">
                            <label
                              htmlFor="sports-type"
                              className="text-xs font-bold"
                            >
                              Resolution <span className="text-red-500">*</span>
                            </label>
                            <div>
                              <select
                                className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                                name="resolution"
                                value={streaming?.resolution}
                                onChange={(e) =>
                                  handleStreamingChange(e, index)
                                }
                              >
                                <option value="">Select One</option>
                                <option value="1080p">1080p</option>
                                <option value="720p">720p</option>
                                <option value="480p">480p</option>
                                <option value="360p">360p</option>
                              </select>
                            </div>
                          </div>

                          <div className="w-1/2">
                            <label
                              htmlFor="sports-type"
                              className="text-xs font-bold"
                            >
                              Platform <span className="text-red-500">*</span>
                            </label>
                            <div>
                              <select
                                className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                                name="platform"
                                onChange={(e) =>
                                  handleStreamingChange(e, index)
                                }
                                value={streaming?.platform}
                              >
                                <option value="">Both</option>
                                <option value="Android">Android</option>
                                <option value="iOS">iOS</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 flex gap-5">
                          <div className="w-1/2">
                            <label
                              htmlFor="potrait"
                              className="text-xs font-bold"
                            >
                              Portrait Watermark(json)
                            </label>
                            <textarea
                              placeholder="Enter json object..."
                              className="block border-2 border-gray-300 rounded-md p-2 w-full"
                              name="potrait_watermark"
                              rows={5}
                              value={streaming?.portrait_watermark}
                              onChange={(e) => handleStreamingChange(e, index)}
                            ></textarea>
                          </div>

                          <div className="w-1/2">
                            <label
                              htmlFor="landscape"
                              className="text-xs font-bold"
                            >
                              Landscape Watermark(json)
                            </label>
                            <textarea
                              placeholder="Enter json object..."
                              className="block border-2 border-gray-300 rounded-md p-2 w-full"
                              name="landscape_watermark"
                              rows={5}
                              value={streaming?.landscape_watermark}
                              onChange={(e) => handleStreamingChange(e, index)}
                            ></textarea>
                          </div>
                        </div>

                        <div className="p-3 flex gap-5">
                          <div className="w-1/2">
                            <label
                              htmlFor="sports-type"
                              className="text-xs font-bold"
                            >
                              Status <span className="text-red-500">*</span>
                            </label>
                            <div>
                              <select
                                className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                                name="status"
                                onChange={(e) =>
                                  handleStreamingChange(e, index)
                                }
                                value={streaming?.status}
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </div>
                          </div>

                          <div className="w-1/2">
                            <label
                              htmlFor="sports-type"
                              className="text-xs font-bold"
                            >
                              Stream Type{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div>
                              <select
                                className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                                name="stream_type"
                                onChange={(e) =>
                                  handleStreamingChange(e, index)
                                }
                                value={streaming?.stream_type}
                              >
                                <option value="">Select One</option>
                                <option value="root stream">Root Stream</option>
                                <option value="restricted">Restricted</option>
                                <option value="m3u8">M3u8</option>
                                <option value="web">Web</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 flex gap-5">
                          <div className="w-1/2">
                            <label
                              htmlFor="sports-type"
                              className="text-xs font-bold"
                            >
                              Stream URL <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full block p-1 rounded-md border-2 border-gray-200"
                              name="stream_url"
                              value={streaming.stream_url}
                              onChange={(e) => handleStreamingChange(e, index)}
                            />
                          </div>

                          <div className="w-1/2">
                            <label
                              htmlFor="stream_thumbnail"
                              className="text-xs font-bold"
                            >
                              Stream Thumbnail{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full block p-1 rounded-md border-2 border-gray-200"
                              name="stream_thumbnail"
                              value={streaming.stream_thumbnail}
                              onChange={(e) => handleStreamingChange(e, index)}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                ))}
                <div className="flex justify-start">
                  <button
                    className="text-sm my-4 font-semibold right-12 bottom-5 bg-blue-600 py-2 px-4 text-white uppercase hover:bg-blue-800 transition active:scale-95 rounded-md shadow-lg"
                    onClick={addStreamingSource}
                  >
                    Add Streaming Source
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`absolute text-sm font-semibold right-12 bottom-[60px] py-2 px-4 text-white uppercase animate-bounce transition active:scale-95 rounded-md shadow-lg ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-800"
            }`}
          >
            Create Match
          </button>
          <FaRegArrowAltCircleUp
            className="absolute h-6 w-6 bottom-3 right-2 text-blue-600 hover:text-blue-800 transition cursor-pointer"
            onClick={scrollToTop}
          />
        </div>
      </Portal>
    </>
  );
};

export default CreateMatch;
