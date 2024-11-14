import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./ultils/Db.js";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
dotenv.config({});
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // to allow cookies to be sent
  })
);

const PORT = process.env.PORT || 3000;

//APIs
app.use("/api", userRoute);
app.use("/api/company", companyRoute);
app.use("/jobs", jobRoute);
app.use("/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port http://localhost:${PORT}`);
});
