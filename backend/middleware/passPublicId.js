const passPublicId = (req, res, next) => {
  req.public_id = req.body.public_id; // Replace with actual public ID logic
  next();
};

module.exports = passPublicId;
