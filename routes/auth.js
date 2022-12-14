import { Router } from "express";
import protectedRoute from "../middleware/auth.js";
import {
  authLogin,
  authRegister,
  authUserDetails,
} from "../controller/auth.js";
const router = Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.route("/me").get(protectedRoute, authUserDetails);

export default router;
