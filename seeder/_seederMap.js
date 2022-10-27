import Bootcamp from "../model/Bootcamp.js";
import Course from "../model/Course.js";
import SeedManager from "./seedManager.js";

export default {
  bootcamp: SeedManager.initSeeder("bootcamps.json", "_data", Bootcamp),
  course: SeedManager.initSeeder("courses.json", "_data", Course),
};
