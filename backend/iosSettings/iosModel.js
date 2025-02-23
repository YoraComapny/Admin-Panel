import mongoose from "mongoose";

const iosSettingSchema = mongoose.Schema({
  general_settings: {
    ios_privacy_policy: {
      type: String,
      trim: true,
      unique: true,
    },
    ios_terms_conditions: {
      type: String,
      trim: true,
    },
    ios_app_share_link: {
      type: String,
      trim: true,
    },
    app_default_page: {
      type: String,
      trim: true,
    },
    notification_type: {
      type: String,
      required: true,
      trim: true,
    },
    firebase_server_key: {
      type: String,
      required: true,
      trim: true,
    },
    firebase_topic: {
      type: String,
      required: true,
      trim: true,
    },
  },
  required_app: {
    required_enable_app: {
      type: String,
      trim: true,
    },
    application_id: {
      type: String,
      trim: true,
    },
    app_url: {
      type: String,
      trim: true,
    },
    app_name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      // required: true,
      trim: true,
    },
  },
});

const iosSetting = mongoose.model("ios-setting", iosSettingSchema);

export default iosSetting;
