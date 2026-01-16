import express from "express";
import { subscribe, getSubscribers } from "../controllers/newsletterController.js";
import authSeller from "../middleware/authSeller.js";

const newsletterRouter = express.Router();

newsletterRouter.post("/subscribe", subscribe);
newsletterRouter.get("/subscribers", authSeller, getSubscribers);

export default newsletterRouter;
