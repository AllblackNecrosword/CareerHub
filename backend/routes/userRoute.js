import express from "express";
import {
  loginHandler,
  signupHandler,
  updateprofileHandler,
  logoutHandler,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../ultils/multer.js";

const router = express.Router();

router.post("/register", singleUpload, signupHandler);
router.post("/login", loginHandler);
router.post("/updateprofile", isAuthenticated,singleUpload, updateprofileHandler);
router.get("/logout", logoutHandler);


export default router;
