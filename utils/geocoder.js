import NodeGeocoder from "node-geocoder";
import { config } from "dotenv";
config({ path: "./config/config.env" });
const options = {
  // privide can be google but am using mapquest
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  // mapquest consumer api key
  apiKey: process.env.GEOCODER_MAPQUEST_KEY,
  // if it needed to format to another format
  formatter: null,
};

export default NodeGeocoder(options);
