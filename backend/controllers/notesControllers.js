const asyncHandler = require("express-async-handler");
const Garden = require("../models/Garden");
const User = require("../models/User");
const Note = require("../models/Note");

const getAllNotes = asyncHandler(async (req, res) => {
  // Get all notes from MongoDB
  const notes = await Note.find().lean();

  if (!notes?.length) {
    return res.status(404).json({ message: "Tidak ada tugas!" });
  }
  res.json(notes);
});

const getAllNotesUser = asyncHandler(async (req, res) => {
  // Get all notes from MongoDB
  const notes = await Note.find().lean();

  // If no notes
  if (!notes?.length) {
    return res.status(400).json({ message: "Tidak ada Tugas!" });
  }

  // Add username to each note before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );

  res.json(notesWithUser);
});

//getallnotes garden?
const getAllNotesGarden = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();
  if (!notes?.length) {
    return res.status(400).json({ message: "Tidak ada tugas!" });
  }
  // You could also do this with a for...of loop
  const notesWithGarden = await Promise.all(
    notes.map(async (note) => {
      const garden = await Garden.findById(note.garden).lean().exec();
      return { ...note, name: garden.name };
    })
  );

  res.json(notesWithGarden);
});

// getallnotes populate garden and user?
const getAllNotesPopulate = asyncHandler(async (req, res) => {
  const notes = await Note.find()
    .populate("user", "username")
    .populate("garden", "name")
    .lean();
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }
  res.json(notes);
});

const createNewNote = asyncHandler(async (req, res) => {
  const { garden, user, title, text, schedule } = req.body;

  // Confirm data
  if (!user || !title || !text || !schedule) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  // Create and store the new user
  const note = await Note.create({ garden, user, title, text, schedule });

  if (note) {
    // Created
    return res.status(201).json({ message: "New note created" });
  } else {
    return res.status(400).json({ message: "Invalid note data received" });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { id, garden, user, title, text, completed, schedule } = req.body;

  // Confirm data
  if (
    !id ||
    !garden ||
    !user ||
    !title ||
    !text ||
    typeof completed !== "boolean" ||
    !schedule
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm note exists to update
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  // Allow renaming of the original note
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  note.user = user;
  note.garden = garden;
  note.title = title;
  note.text = text;
  note.completed = completed;
  note.schedule = schedule;

  const updatedNote = await note.save();

  res.json(`'${updatedNote.title}' updated`);
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Note ID required" });
  }

  // Confirm note exists to delete
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await note.deleteOne();

  const reply = `Note '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllNotes,
  getAllNotesUser,
  getAllNotesGarden,
  getAllNotesPopulate,
  createNewNote,
  updateNote,
  deleteNote,
};
