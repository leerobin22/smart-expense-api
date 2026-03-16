import express from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/auth.controller.js";
import { authInputValidator } from "../validators/auth.validator.js";
import { validateInput } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/register", authInputValidator, validateInput,registerUserController);
router.post("/login", authInputValidator, validateInput, loginUserController);

export default router;
