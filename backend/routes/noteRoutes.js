const express = require("express");
const router = express.Router();
const notesControllers = require("../controllers/notesControllers");

router.get("/bygarden", notesControllers.getAllNotesGarden);
router.get("/populate", notesControllers.getAllNotesPopulate);
router.get("/byuser", notesControllers.getAllNotesUser);
router
  .route("/")
  .get(notesControllers.getAllNotes)
  .post(notesControllers.createNewNote)
  .patch(notesControllers.updateNote)
  .delete(notesControllers.deleteNote);

module.exports = router;
