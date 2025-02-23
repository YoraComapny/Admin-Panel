import express from "express";
import {
  upload,
  createAndUpdateIos,
  getIosSettings,
} from "./iosSettingsController.js";

const iosSettingRouter = express.Router();

iosSettingRouter.post(
  "/set-ios-setting",
  upload.single("filename"),
  createAndUpdateIos
);
iosSettingRouter.get("/get-ios-setting", getIosSettings);

export default iosSettingRouter;
