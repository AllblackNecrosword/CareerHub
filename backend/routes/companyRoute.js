import express from "express";
import {
  registerCompany,
  getCompany,
  getcompanyById,
  updateCompany,
} from "../controllers/companyController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../ultils/multer.js";

const router = express.Router();

router.post("/registercompany", isAuthenticated, registerCompany);
router.get("/getcompany", isAuthenticated, getCompany);
router.get("/getcompany/:id", isAuthenticated, getcompanyById);
router.put("/updatecompany/:id", isAuthenticated,singleUpload, updateCompany);

export default router;
