import path from "path";
import multer from "multer";
import fs from "fs";
import AndroidSetting from "./androidModel.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "androidSettingupload/");
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
    cb("You're allowed to uopload images only", false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // limit to 5MB
  },
});

const removeImage = (file) => {
  fs.unlink("./androidSettingupload/" + file, function (err) {
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

const createAndUpdateAndroid = async (req, res) => {
  const { android_privacy_policy,
    android_terms_conditions,
    android_app_share_link,
    android_default_page,
    ios_app_share_link,
    ios_default_page,
    notification_type,
    firebase_server_key,
    firebase_topic,
    required_enable_app,
    application_id,
    app_url,
    app_name,
    description,
  } = req.body;

   console.log(req?.file?.filename, "filename");
  const filename = req?.file?.filename || "";

  const android = await AndroidSetting.findOne();
  if (android) {
    if (
      (android_privacy_policy ||
        android_terms_conditions ||
        android_app_share_link ||
        android_default_page ||
        ios_app_share_link ||
        ios_default_page ||
        required_enable_app ||
        notification_type ||
        firebase_server_key ||
        firebase_topic ||
        required_enable_app,
      application_id || app_url || app_name || description || filename)
    ) {
      try {
        if (android?.image?.length && filename?.length) {
          removeImage(android?.image);
        }

        android.general_settings = {
          android_privacy_policy:
            android_privacy_policy ||
            android.general_settings.android_privacy_policy,
          android_terms_conditions:
            android_terms_conditions ||
            android.general_settings.android_terms_conditions,
          android_app_share_link:
            android_app_share_link ||
            android.general_settings.android_app_share_link,
          android_default_page:
            android_default_page ||
            android.general_settings.android_default_page,
          ios_app_share_link:
            ios_app_share_link || android.general_settings.ios_app_share_link,
          ios_default_page:
            ios_default_page || android.general_settings.ios_default_page,
          notification_type:
            notification_type || android.general_settings.notification_type,
          firebase_server_key:
            firebase_server_key || android.general_settings.firebase_server_key,
          firebase_topic:
            firebase_topic || android.general_settings.firebase_topic,
        };
        android.required_app = {
          required_enable_app:
            required_enable_app || android.required_app.required_enable_app,
          application_id: application_id || android.required_app.application_id,
          app_url: app_url || android.required_app.app_url,
          app_name: app_name || android.required_app.app_name,
          description: description || android.required_app.description,
          logo: filename || android.required_app.logo,
        };
        const android_setting = await android.save();
        res.status(200).json({
          success: true,
          message: "Updated Settings successfully.",
          android_setting,
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
        message: "Something went wrong",
      });
    }
  }
  // If no settings found, then create settings
  else if (!android) {
    try {
      const newAndroid = new AndroidSetting({
        general_settings: {
          android_privacy_policy: android_privacy_policy,
          android_terms_conditions: android_terms_conditions,
          android_app_share_link: android_app_share_link,
          android_default_page: android_default_page,
          ios_app_share_link: ios_app_share_link,
          ios_default_page: ios_default_page,
          notification_type: notification_type,
          firebase_server_key: firebase_server_key,
          firebase_topic: firebase_topic,
        },
        required_app: {
          required_enable_app: required_enable_app,
          application_id: application_id,
          app_url: app_url,
          app_name: app_name,
          description: description,
          logo: filename,
        },
      });
      await newAndroid.save();

      res.status(200).json({
        success: true,
        message: "Settings Created successfully",
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
      message: "App Information not found",
    });
  }
};







const getAndroidSettings = async (req, res) => {
  try {
    const androidSetting = await AndroidSetting.findOne();

    // let baseURL = "http://localhost:5050";
    
    let baseURL = "http://localhost:8080";
    if (process.env.NODE_ENV === "PRODUCTION") {
      baseURL = "https://sportsdashboard.onrender.com";
    }

    if (androidSetting) {
      const imageURL = `${baseURL}/androidSettingupload/${androidSetting.required_app.logo}`;
      // console.log(imageURL);    
      androidSetting.required_app.logo = imageURL;
      res.status(200).json({
        message: "Android setting found",
        settings: androidSetting,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Android setting not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { upload, createAndUpdateAndroid, getAndroidSettings };
