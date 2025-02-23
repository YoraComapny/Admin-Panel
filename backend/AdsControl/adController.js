import AdModel from "./AdModel.js";

// Create and update ad settings function
const createAndUpdateAdSettings = async (req, res) => {
  try {
    const { android, ios } = req.body;

    // Check if ad settings already exist, if not create new, else update
    let adSettings = await AdModel.findOne();
    if (!adSettings) {
      adSettings = new AdModel({
        android,
        ios,
      });
    } else {
      if (android) {
        adSettings.android.ad_status = android.ad_status || "";
        adSettings.android.click_control = android.click_control || "";
        adSettings.android.google_app_id = android.google_app_id || "";
        adSettings.android.google_app_open_ads =
          android.google_app_open_ads || "";
        adSettings.android.google_banner_ads = android.google_banner_ads || "";
        adSettings.android.google_interstitial_ads =
          android.google_interstitial_ads || "";
        adSettings.android.google_adaptive_interstitial_ads =
          android.google_adaptive_interstitial_ads || "";
        adSettings.android.google_native_ads = android.google_native_ads || "";
        adSettings.android.google_rewarded_ads_code =
          android.google_rewarded_ads_code || "";
      }

      if (ios) {
        adSettings.ios.ad_status = ios.ad_status || "";
        adSettings.ios.click_control = ios.click_control || "";
        adSettings.ios.google_app_id = ios.google_app_id || "";
        adSettings.ios.google_app_open_ads = ios.google_app_open_ads || "";
        adSettings.ios.google_banner_ads = ios.google_banner_ads || "";
        adSettings.ios.google_interstitial_ads =
          ios.google_interstitial_ads || "";
        adSettings.ios.google_adaptive_interstitial_ads =
          ios.google_adaptive_interstitial_ads || "";
        adSettings.ios.google_native_ads = ios.google_native_ads || "";
        adSettings.ios.google_rewarded_ads_code =
          ios.google_rewarded_ads_code || "";
      }
    }

    // Save the ad settings
    await adSettings.save();

    res
      .status(200)
      .json({ success: true, message: "Ad settings saved successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving ad settings.",
      error: error.message,
    });
  }
};

// Get Ad Settings function
const getAdSettings = async (req, res) => {
  try {
    const adSettings = await AdModel.findOne();
    if (!adSettings) {
      res
        .status(404)
        .json({ success: false, message: "Ad settings not found." });
    } else {
      res.status(200).json({ success: true, adSettings });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving ad settings.",
      error: error.message,
    });
  }
};

export { createAndUpdateAdSettings, getAdSettings };
