const jwt = require("jsonwebtoken");

exports.verifyUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: "No token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

exports.verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: "No token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded.isAdmin) return res.status(403).json({ msg: "Admin only" });

  next();
};
