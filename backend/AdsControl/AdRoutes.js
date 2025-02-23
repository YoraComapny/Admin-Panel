import { createAndUpdateAdSettings, getAdSettings } from "./adController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/google-ads-settings", authMiddleware, createAndUpdateAdSettings); //working fine
router.get("/get-ads-settings", getAdSettings);  //working fine

export default router;
