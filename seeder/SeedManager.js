import fs from "fs";
import path from "path";
import colors from "colors";
import { config } from "dotenv";
config({ path: "../config/config.env" });
import mongoose from "mongoose";

export default class Seeder {
  constructor(fileName, dataPath, model) {
    this.fileName = fileName;
    this.dataPath = dataPath;
    this.model = model;
  }
  async connectDb() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
      console.log(`${error.message}`.red.inverse);
    }
  }

  createSeeds = async () => {
    try {
      await this.connectDb();
      const seedObject = fs.readFileSync(
        `${path.join(path.resolve(), `${this.dataPath}/${this.fileName}`)}`,
        "utf8"
      );
      const seedObjArray = JSON.parse(seedObject);
      await this.model.create(seedObjArray);
      console.log("Resource imported successfully".green.inverse.bold);
      process.exit();
    } catch (error) {
      console.log(`${error.message}`.red.inverse);
      process.exit();
    }
  };

  static initSeeder(fileName, dataPath, model) {
    return new Seeder(fileName, dataPath, model);
  }

  deleteSeeds = async () => {
    try {
      await this.connectDb();
      await this.model.deleteMany();
      console.log("Resource was deleted successfully".green.inverse.bold);
      process.exit();
    } catch (error) {
      console.log(`${error.message}`.red.inverse);
      process.exit();
    }
  };
}
