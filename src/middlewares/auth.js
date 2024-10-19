import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "No token, authorization denied" });
  try {
    // verifying token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token is not valid" });
  }
};

export default authMiddleware;
