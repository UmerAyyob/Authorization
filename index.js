import express from "express";
import router from "./routes/user.js";
import { connectToMongoDB } from "./config/connect.js";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

app.use(express.json());

app.use("/api/auth", router);

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
