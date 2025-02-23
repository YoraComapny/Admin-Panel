import path from "path";
import multer from "multer";
import fs from "fs";
import AppInformation from "./appInformationModel.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "appInformationupload/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|jfif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("You're allowed to upload images only", false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // limit to 2MB
  },
});

// Function to createAndUpdateRoute
const createAndUpdateSettings = async (req, res) => {
  // Getting the post form data from request
  const { appName,  app_unique_id, sports_api_base_url,  sports_api_key,  ip_api_key, highlights_type, status,} = req.body;

  // Getting the filename
  const filename = req?.file?.filename || "";

  // Fetching existing settings
  const appInfo = await AppInformation.findOne();

  // If setting already exist
  if (appInfo) {
    // if there is new data
    if (
      appName ||
      app_unique_id ||
      sports_api_base_url ||
      status ||
      sports_api_key ||
      ip_api_key ||
      highlights_type ||
      filename
    ) {
      try {
        if (appInfo?.image?.length && filename?.length) {
          removeImage(appInfo?.image);
        }

        // Update the values of existing settings
        appInfo.appName = appName || appInfo.appName;
        appInfo.app_unique_id = app_unique_id || appInfo.app_unique_id;
        appInfo.sports_api_base_url =
          sports_api_base_url || appInfo.sports_api_base_url;
        appInfo.status = status || appInfo.status;
        appInfo.ip_api_key = ip_api_key || appInfo.ip_api_key;
        appInfo.highlights_type = highlights_type || appInfo.highlights_type;
        appInfo.sports_api_key = sports_api_key || appInfo.sports_api_key;
        appInfo.app_logo = filename ?? appInfo.app_logo;

        // Saving updated settings
        const appInfomation = await appInfo.save();
        res.status(200).json({
          success: true,
          message: "success",
          appInfomation,
        });
      } catch (error) {
        console.log(error, "error");
        res.status(400).json({
          success: false,
          message: `${error?.message}`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "something wents wrong",
      });
    }
  }
  // If existing settings do not exist, create them
  else if (!appInfo) {
    // Checking if required form values exist
    if (
      appName &&
      app_unique_id &&
      sports_api_base_url &&
      ip_api_key &&
      sports_api_key
    ) {
      try {
        const appInformation = new AppInformation({
          appName,
          sports_api_base_url,
          status,
          app_unique_id,
          ip_api_key,
          highlights_type,
          sports_api_key,
          app_logo: filename,
        });
        const settings = await appInformation.save();

        res.status(200).json({
          success: true,
          message: "App Information settings created successfully",
          data: settings,
        });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Something went wrong", error: err?.message });
      }
    } else {
      res.status(400).json({ message: "Please enter all required fields" });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};








// Remove image function
const removeImage = (file) => {
  fs.unlink("./appInformationupload/" + file, function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
    } else {
      console.info(`removed`);
    }
  });
};

// Get route for app Information settings
const getAppInformationSettings = async (req, res) => {
  try {
    const appSettings = await AppInformation.findOne();
    let baseURL = "http://localhost:5050";
    if (process.env.NODE_ENV === "PRODUCTION") {
      baseURL = "https://sportsdashboard.onrender.com";
    }
    if (appSettings) {
      // Create image url
      const imageURL = `${baseURL}/appInformationupload/${appSettings.app_logo}`;
      res.status(200).json({
        message: "Data retrieved successfully",
        settings: {
          ...appSettings._doc,
          app_logo: imageURL, // Replace app_logo with the full image URL
        },
      });
    } else {
      res.status(400).json({ message: "Couldn't find exisiting settings" });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err?.message,
    });
  }
};

export { getAppInformationSettings, createAndUpdateSettings, upload };
