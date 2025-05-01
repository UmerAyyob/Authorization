import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token is: ", token);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Authentication credentials missing or invalid",
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decode);

    req.user = decode;
    console.log("Client Middleware");
    next();
  } catch (error) {
    console.log("Error :", error);
  }
};
export const adminMiddleware = async (req, res, next) => {
  try {
    console.log("Admin Middleware Start");
    console.log("User in Request:", req.user.role);
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied, Admin Only" });
    }
    console.log("Admin Middleware End");
    next();
  } catch (error) {
    console.log("ERROR :", error);
  }
};
