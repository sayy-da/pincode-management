import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    console.log(req,'sayyida')
    const token = req.headers["authorization"]?.split(" ")[1]; 
    console.log(req.headers,'safasss')
  
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token is invalid" });
    }
    
    req.user = decoded; 
    next(); 
  });
};
