import fs from "fs";
import path from "path";
import colors from "colors";
import Bootcamp from "../model/Bootcamp.js";

export const createBooCampSeeder = async () => {
  try {
    const bootcamps = fs.readFileSync(
      `${path.join(path.resolve(), "_data/bootcamps.json")}`,
      "utf8"
    );
    const bootcampsArray = JSON.parse(bootcamps);
    //   console.log(bootcampsArray);
    const done = await Bootcamp.create(bootcampsArray);

    console.log("Bootcamp imported successfully".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error.message}`.red.inverse);
    process.exit();
  }
};

export const DeleteBooCampSeeder = async () => {
  try {
    const done = await Bootcamp.deleteMany();
    if (done) {
      console.log("Bootcamp was deleted successfully".green.inverse);
      process.exit();
    }
    console.log("Error removing Bootcamp".red.inverse);
  } catch (error) {
    console.log(`${error.message}`.red.inverse);
    process.exit();
  }
};
