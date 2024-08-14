import express from "express";
import {
  createJob,
  getAllJob,
  getJobById,
  getAdminJobs,
} from "../controllers/jobsController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/createjob", isAuthenticated, createJob);
router.get("/alljobs", isAuthenticated, getAllJob);
router.get("/job/:id", isAuthenticated, getJobById);
router.get("/adminjobs", isAuthenticated, getAdminJobs);

export default router;
