import instance from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line no-unused-vars
// const prod = "https://sportsdashboard.onrender.com/api";
const prod = "https://admin-panel-ubi4.onrender.com/api";
const local = "http://localhost:8080/api";
const axios = instance.create({
  baseURL: prod,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token, userId) => {
  if (token) {
    // Apply token and userId to headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["UserId"] = userId;
  } else {
    // Delete token and userId from headers
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["UserId"];
  }
};

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token && user?.userId) {
      // Set token and userId from local storage to headers
      // config.headers.Authorization = user.token;

      config.headers.Authorization = `Bearer ${user.token}`;
      config.headers.UserId = user.userId;
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ***************************************** USER APIS ******************************************************//

export const signupUser = async (form) => {
  try {
    const res = await axios.post(`/signup`, form);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post(`/login`, user);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

// ***************************************** MATCHES APIS ******************************************************//

export const createMatch = async (formData) => {
  try {
    const res = await axios.post(`/live/create-match`, formData);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const fetchAllMatches = async (currentPage, searchQuery, perPage) => {
  try {
    const res = await axios.get(
      `/live/all-matches?page=${currentPage}&search=${searchQuery}&perPage=${perPage}`
    );
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const deleteMatch = async (id) => {
  try {
    const res = await axios.delete(`/live/delete-match/${id}`);
    toast.success("Match deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getMatch = async (id) => {
  try {
    const res = await axios.get(`/live/get-single-match/${id}`);

    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};
export const duplicateMatch = async (id) => {
  try {
    const res = await axios.post(`/live/duplicate/${id}`);
    if (res) {
      toast.success("Match duplicated successfully!", {
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
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const updateMatch = async (id, formData) => {
  try {
    const res = await axios.put(`/live/update-match/${id}`, formData);
    if (res) {
      toast.success("Match updated successfully!", {
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
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const updateMatchOrder = async (order) => {
  try {
    const res = await axios.post("/live/reorder", { numbers: order });
    return res.data;
  } catch (error) {
    console.error("Error updating match order", error);
    throw error;
  }
};

export const getOrder = async () => {
  try {
    const res = await axios.get("/live/get-order");
    return res.data.data.numbers;
  } catch (err) {
    console.log("Internal server error", err);
    throw err;
  }
};

export const getThumbnail = async (data) => {
  try {
    const res = await axios.post("/live/gen-thumbnail", data);
    return res.data.thumbnail;
  } catch (err) {
    console.log("Internal server error", err);
    return false;
  }
};

// ***************************************** NEWS APIS ******************************************************//

export const createNews = async (data) => {
  try {
    const res = await axios.post(`/create/news`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("image ka error ", res);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const editNews = async (id, data) => {
  try {
    const res = await axios.put(`/news/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAllNews = async (currentPage, searchQuery, perPage) => {
  try {
    const res = await axios.get(
      `/all/news?page=${currentPage}&search=${searchQuery}&perPage=${perPage}`
    );
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};
export const deleteSingleNews = async (id) => {
  try {
    const res = await axios.delete(`/delete-news/${id}`);

    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getSingleNews = async (id) => {
  try {
    const res = await axios.get(`/news/${id}`);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

// ************************************* MANAGE APP APIS ************************************************//

// *********** APP INFORMATION SECTION ************ //
export const createUpdateAppInformation = async (data) => {
  try {
    const res = await axios.post(
      `/manage-app/app-information/set-app-information`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success(`Settings updated!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return error;
  }
};
export const getAppInformation = async () => {
  try {
    const res = await axios.get(
      `/manage-app/app-information/get-app-information`
    );
    return res.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return error;
  }
};

// *********** ANDROID SECTION ************ //
export const androidCreateUpdateSettings = async (data) => {
  try {
    const res = await axios.post(
      `/manage-app/android/set-android-setting`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success(`${res?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return error;
  }
};
export const getAndroidSettings = async () => {
  try {
    const settings = await axios.get("/manage-app/android/get-android-setting");
    return settings;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      closeOnClick: true,
      theme: "light",
    });
    return err;
  }
};

// *********** iOS SECTION ************ //
// export const iosCreateUpdateSettings = async (data) => {
//   try {
//     const res = await axios.post(`/ios/set-ios-setting`, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     toast.success(`${res?.data?.message}`, {
//       position: "top-right",
//       autoClose: 800,
//       theme: "light",
//     });
//     return res;
//   } catch (error) {
//     toast.error(`${error?.response?.data?.message}`, {
//       position: "top-right",
//       autoClose: 800,
//       theme: "light",
//     });
//     return error;
//   }
// };
// export const getIosSettings = async () => {
//   try {
//     const settings = await axios.get("/ios/get-ios-setting");
//     return settings;
//   } catch (err) {
//     toast.error(`${err?.response?.data?.message}`, {
//       position: "top-right",
//       autoClose: 800,
//       closeOnClick: true,
//       theme: "light",
//     });
//     return err;
//   }
// };
// *********** BLOCK COUNTRIES SECTION ************ //
export const getBlockedCountries = async () => {
  try {
    const blockedCountries = await axios.get(
      "/manage-app/block/get-block-countries"
    );
    return blockedCountries.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return err;
  }
};

export const CreateAndUpdateBlockedCountry = async (countries) => {
  try {
    const res = await axios.post(
      `/manage-app/block/block-countries`,
      countries
    );
    toast.success(`Changes saved!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      theme: "light",
    });
    return error;
  }
};

export const deleteCountry = async (country) => {
  try {
    const del = await axios.delete(
      `/manage-app/block/unblock-country/${country}`
    );
    toast.success(`Country unblocked!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      theme: "light",
    });
    return del;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      theme: "light",
    });
    return err;
  }
};

// *********** ADS SECTION ************ //
export const createUpdateAdSettings = async (settings) => {
  try {
    const res = await axios.post(
      `/manage-app/ads/google-ads-settings`,
      settings
    );
    toast.success(`Changes saved!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAdsSettings = async () => {
  try {
    const settings = await axios.get("/manage-app/ads/get-ads-settings");
    return settings.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};
// ***************************************** MOBILE VIEW APIS ******************************************************//

export const handleView = async (data) => {
  try {
    const res = await axios.post("/live/mobile-view", data);
    return res;
  } catch (err) {
    toast.error(`Error occured`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const fetchMobileView = async () => {
  try {
    const res = await axios.get("/live/get-view");
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// ***************************************** NOTIFICATION APIS ******************************************************//
export const createNotification = async (notification) => {
  try {
    const res = await axios.post(
      `/notifications/create-notification`,
      notification
    );
    toast.success(`Notification created successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAllNotifications = async () => {
  try {
    const notifications = await axios.get(
      "/notifications/get-all-notifications"
    );
    return notifications.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

export const deleteNotification = async (id) => {
  try {
    const del = await axios.delete(`/notifications/delete-notification/${id}`);
    toast.success(`Notification deleted successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return del;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

export const sendNotification = async (id) => {
  try {
    const notify = await axios.post(`/notifications/send-notification/${id}`);
    toast.success(`Notification sent successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return notify;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

// ***************************************** ADMIN SETTINGS APIS ******************************************************//
export const createAdminSettings = async (admin) => {
  try {
    const res = await axios.post(`/admin/set-admin-settings`, admin);
    toast.success(`Settings saved successfully!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAdminSettings = async () => {
  try {
    const settings = await axios.get("/admin/get-admin-settings");
    return settings.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

// ***************************************** FIXTURES & LEAGUES ******************************************************//
export const searchLeagues = async (country) => {
  if (country) {
    try {
      const res = await axios.get(`/fixture/get-leagues-rapid/${country}`);
      return res.data;
    } catch (err) {
      toast.error(`Something went wrong: ${err.message}`);
    }
  }
};
export const getLeagues = async () => {
  try {
    const res = await axios.get(`/fixture/get-leagues`);
    // console.log(res.data.data)
    return res.data.data;
  } catch (err) {
    toast.error(`Something went wrong: ${err.message}`);
  }
};
// 🤑
// export const getLeagues = async () => {
//   try {
//     const res = await axios.get(`https://api.sportmonks.com/v3/football/leagues`, {
//       params: {
//         api_token: "SPORTS_API_KEY" // Yahan apni API key dalni hogi
//       }
//     });
//     return res.data;
//   } catch (err) {
//     toast.error(`Something went wrong: ${err.message}`);
//   }
// };

export const saveLeagues = async (data) => {
  try {
    console.log(data);
    const res = await axios.post(`/fixture/set-leagues`, data);
    toast.success("League saved!");
    return res;
  } catch (err) {
    toast.error(`Something went wrong: ${err.message}`);
  }
};
export const deleteLeague = async (id) => {
  try {
    const res = await axios.delete(`/fixture/delete-league/${id}`);
    toast.success("League deleted successully");
    return res;
  } catch (err) {
    toast.error(`Something went wrong: ${err.message}`);
  }
};

export const getFixtures = async (date) => {
  try {
    const res = await axios.post(`/fixture/get-fixture-rapid`, date);
    console.log("its my api", res.data);
    return res.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      theme: "light",
    });
  }
};
