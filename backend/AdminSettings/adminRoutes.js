import express from "express";
import { createAdminSettings, getAdminSettings } from "./adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const administratorSettings = express.Router();

administratorSettings.post("/set-admin-settings", authMiddleware, createAdminSettings); //working fine
administratorSettings.get("/get-admin-settings", getAdminSettings);  //working fine

export default administratorSettings;
