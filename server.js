import path from "path";
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser"
import colors from "colors";
import { connectDb } from "./config/db.js";
config({ path: "./config/config.env" });

import bootCamps from "./routes/bootcamps.js";
import courses from "./routes/courses.js";
import auth from "./routes/auth.js";
import errorHandler from "./middleware/error.js";
const app = express();

// file upload
app.use(fileUpload());

// set static path
app.use(express.static(path.join(path.resolve(), "public")));

// body parser
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootCamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const server = app.listen(process.env.PORT || 5000, () => {
  connectDb();
  console.log(
    `Server running ${process.env.NODE_ENV} mode a port ${process.env.PORT}`
      .yellow.bold
  );
});

server.on("error", (err) => {
  process.exit(1);
});
