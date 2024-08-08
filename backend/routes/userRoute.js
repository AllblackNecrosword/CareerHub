import express from "express";
import {
  loginHandler,
  signupHandler,
  updateprofileHandler,
  tryout
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", signupHandler);
router.post("/login", loginHandler);
router.post("/updateprofile", isAuthenticated, updateprofileHandler);
router.get("/try",tryout);

export default router;
