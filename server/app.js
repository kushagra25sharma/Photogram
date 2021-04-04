import express from "express";
import bodyPareser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";


const app = express();
dotenv.config();

app.use(bodyPareser.json({limit:"30mb", extended: true}));
app.use(bodyPareser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/user", userRoutes);
app.use("/posts", postRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(app.listen(PORT, () => console.log("server runing on port 5000")))
        .catch((err) => console.log(err))

mongoose.set("useFindAndModify", false);