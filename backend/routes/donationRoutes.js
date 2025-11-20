import express from "express";
import { addDonation, getAllDonations } from "../controllers/donationController.js";

const router = express.Router();

router.post("/", addDonation);
router.get("/", getAllDonations);

export default router;
