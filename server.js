import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import colors from "colors";
import { connectDb } from "./config/db.js";
config({ path: "./config/config.env" });
connectDb();

import bootCamps from "./routes/bootcamps.js";
import errorHandler from "./middleware/error.js";
const app = express();

// body parser
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootCamps);

app.use(errorHandler);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running ${process.env.NODE_ENV} mode a port ${process.env.PORT}`
      .yellow.bold
  );
});

server.on("error", (err) => {
  process.exit(1);
});
