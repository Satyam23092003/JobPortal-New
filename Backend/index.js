import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from './routes/user.routes.js'
import jobRoute from './routes/job.routes.js'
import companyRoute from './routes/company.routes.js' 
import applicationRoute from './routes/application.routes.js'
const app = express();
import dotenv from 'dotenv'
dotenv.config({});


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};


app.use(cors(corsOptions));


//apis
app.use("/api/users",userRoute);
app.use("/api/company",companyRoute);
app.use("/api/job",jobRoute)
app.use("/api/application",applicationRoute)

const PORT = process.env.PORT || 5011;
app.listen(PORT, (req, res) => {
    connectDB()
  console.log(`Server is running on port ${PORT}`);
});
