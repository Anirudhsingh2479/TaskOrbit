import { Router } from "express";
import passport from "passport";
import { config } from "../config/app.config.js";
import {
  googleAuthCallback,
  loginController,
  logOutController,
  registerUserController,
} from "../controllers/auth.controller.js";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const authRoutes = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginController);

authRoutes.post("/logout", logOutController);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${config.FRONTEND_ORIGIN}/auth/google/failure`,
    session: true,
  }),
  googleAuthCallback
);

export default authRoutes; 