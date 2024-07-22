// const express = require("express");
// const asyncHandler = require("express-async-handler");
// const passPublicId = require("../middleware/passPublicId");
// const { createGarden } = require("./gardenController");
// const cloudinaryConfig = require("../config/cloudinaryConfig");
// const router = express.Router();
// const cloudinary = require("cloudinary").v2;

// router.post("/do-something-with-photo", passPublicId, async (req, res) => {
//   const expectedSignature = cloudinary.utils.api_sign_request(
//     { public_id: req.body.public_id, version: req.body.version },
//     cloudinaryConfig.api_secret
//   );
//   try {
//     // Do something with the photo here
//     console.log("Doing something with the photo...");
//     if (expectedSignature === req.body.signature) {
//       // Call the createGarden function
//       await createGarden(req, res);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error doing something with the photo" });
//   }
// });

// module.exports = router;
