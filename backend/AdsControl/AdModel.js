import mongoose from "mongoose";

const adSchema = mongoose.Schema(
  {
    android: {
      ad_status: {
        type: String,
        trim: true,
      },
      click_control: {
        type: String,
        trim: true,
      },
      google_app_id: {
        type: String,
        trim: true,
      },
      google_app_open_ads: {
        type: String,
        trim: true,
      },
      google_banner_ads: {
        type: String,
        trim: true,
      },
      google_interstitial_ads: {
        type: String,
        trim: true,
      },
      google_adaptive_interstitial_ads: {
        type: String,
        trim: true,
      },
      google_native_ads: {
        type: String,
        trim: true,
      },
      google_rewarded_ads_code: {
        type: String,
        trim: true,
      },
    },
    ios: {
      ad_status: {
        type: String,
        trim: true,
      },
      click_control: {
        type: String,
        trim: true,
      },
      google_app_id: {
        type: String,
        trim: true,
      },
      google_app_open_ads: {
        type: String,
        trim: true,
      },
      google_banner_ads: {
        type: String,
        trim: true,
      },
      google_interstitial_ads: {
        type: String,
        trim: true,
      },
      google_adaptive_interstitial_ads: {
        type: String,
        trim: true,
      },
      google_native_ads: {
        type: String,
        trim: true,
      },
      google_rewarded_ads_code: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

const AdModel = mongoose.model("AdModel", adSchema);

export default AdModel;
