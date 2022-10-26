import { config } from "dotenv";
config({ path: "../config/config.env" });
import mongoose from "mongoose";
import { createBooCampSeeder, DeleteBooCampSeeder } from "./bootcamp.js";

Promise.resolve(mongoose.connect(process.env.MONGO_URI)).catch((err) =>
  console.log(err.message)
);
if (process.argv[2] === "-clearBootcamp") {
  Promise.resolve(DeleteBooCampSeeder());
} else if (process.argv[2] === "-uploadBootcamp") {
  Promise.resolve(createBooCampSeeder());
}
