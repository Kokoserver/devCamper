import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
config({ path: "./config/config.env" });
import bootCamps from "./routes/bootcamps.js";
const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootCamps);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running ${process.env.NODE_ENV} mode a port ${process.env.PORT}`
  );
});
