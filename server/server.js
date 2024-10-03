import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

import { connectMongoClient } from "./config/connection.js";
import { UserRoute } from "./routes/userRoute.js";
import { AdminRoute } from "./routes/adminRoute.js";
import { AuthenticationRoute } from "./routes/authenticationRoute.js";

const corsOptions = {
  origin:"http://127.0.0.1:5173",
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongoClient();
app.use("/", UserRoute);
app.use("/admin", AdminRoute);
app.use("/auth", AuthenticationRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
