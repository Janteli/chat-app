import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt ;
    
    // Check if token is present
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Find the user associated with the token
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user to the request object
    req.user = user;
    next();

  } catch (error) {
    console.error("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default secureRoute;
