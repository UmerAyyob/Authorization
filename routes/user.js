import express from "express";
const router = express.Router();
import {
  resgister,
  login,
  logout,
  home,
  adminBlock,
} from "../controllers/user.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authMiddleware.js";

router.post("/register", resgister);
router.post("/login", login);
router.post("/logout", logout);
router.get("/home", authMiddleware, home);
router.get("/admin", authMiddleware, adminMiddleware, adminBlock);

export default router;
