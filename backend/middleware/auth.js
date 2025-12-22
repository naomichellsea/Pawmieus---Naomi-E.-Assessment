import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
