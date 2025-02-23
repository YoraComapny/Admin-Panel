import express from "express";
import {
  getCountryArray,
  deleteCountry,
  createAndUpdateCountryArray,
} from "./blockController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const blockCountry = express.Router();

blockCountry.post("/block-countries", authMiddleware, createAndUpdateCountryArray);  //working fine
blockCountry.delete("/unblock-country/:country", authMiddleware, deleteCountry);     //working fine
blockCountry.get("/get-block-countries", getCountryArray); //working fine

export default blockCountry;
