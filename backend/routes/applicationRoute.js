import express from "express";
import {
  applyJob,
  getAppliedJob,
  getApplications,
  updateStatus,
} from "../controllers/applicationController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/postapplication/:id", isAuthenticated, applyJob);
router.get("/getappliedjob", isAuthenticated, getAppliedJob);
router.get("/getapplication/:id", isAuthenticated, getApplications);
router.post("/updatestatus/:id", isAuthenticated, updateStatus);

export default router;
