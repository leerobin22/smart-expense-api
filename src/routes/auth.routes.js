import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { authInputValidator } from "../validators/auth.validator.js";
import { validateInput } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/register", authInputValidator, validateInput, registerUser);
router.post("/login", authInputValidator, validateInput, loginUser);

export default router;
