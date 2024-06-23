const asyncHandler = require("express-async-handler");
const Garden = require("../models/Garden");
const Note = require("../models/Note");

const getAllGardens = asyncHandler(async (req, res) => {
  const gardens = await Garden.find().lean().exec();
  if (!gardens?.length) {
    return res.status(404).json({ message: "No garden found" });
  }
  res.json(gardens);
});

//createnew with diffrent name?

const createGarden = asyncHandler(async (req, res) => {
  const { name, address, area } = req.body;
  if (!name || !address || !area) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  //check duplicate name?
  const existingGarden = await Garden.findOne({ name });
  if (existingGarden) {
    return res
      .status(400)
      .json({ message: "Garden with this name already exists" });
  }

  const garden = await Garden.create({ name, address, area });
  res.json(garden);
  if (garden) {
    res.status(201).json({ message: "Garden created successfully" });
  } else {
    res.status(400).json({ message: "Failed to create garden" });
  }
});

const updateGarden = asyncHandler(async (req, res) => {
  const { id, name, address, area, image, description, status } = req.body;
  if (!id || !name || !address || !area) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  //garden exist?
  const garden = await Garden.findById(id).exec();
  if (!garden) {
    return res.status(404).json({ message: "Garden not found" });
  }
  //check duplicate name?
  const existingGarden = await Garden.findOne({ name });
  if (existingGarden && existingGarden.id !== id) {
    return res
      .status(400)
      .json({ message: "Garden with this name already exists" });
  }
  garden.name = name;
  garden.address = address;
  garden.area = area;
  garden.image = image;
  garden.description = description;
  garden.status = status;
  const updatedGarden = await garden.save();
  res.json(updatedGarden);
  if (updatedGarden) {
    res.status(200).json({ message: "Garden updated successfully" });
  } else {
    res.status(400).json({ message: "Failed to update garden" });
  }
});
//add gardennotes?
const addGardenNote = asyncHandler(async (req, res) => {
  const { id, note } = req.body;
  if (!id || !note) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const garden = await Garden.findById(id).exec();
  if (!garden) {
    return res.status(404).json({ message: "Garden not found" });
  }

  garden.notes.push({ note, date: new Date() });
  const updatedGarden = await garden.save();
  res.json(updatedGarden);
  if (updatedGarden) {
    res.status(200).json({ message: "Garden note added successfully" });
  } else {
    res.status(400).json({ message: "Failed to add garden note" });
  }
});
//delete gardennotes?
const deleteGardenNote = asyncHandler(async (req, res) => {
  const { id, noteId } = req.body;
  if (!id || !noteId) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const garden = await Garden.findById(id).exec();
  if (!garden) {
    return res.status(404).json({ message: "Garden not found" });
  }

  garden.notes.pull({ _id: noteId });
  const updatedGarden = await garden.save();
  res.json(updatedGarden);
  if (updatedGarden) {
    res.status(200).json({ message: "Garden note deleted successfully" });
  } else {
    res.status(400).json({ message: "Failed to delete garden note" });
  }
});

//delete garden?
const deleteGarden = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const note = await Note.findOne({ garden: id }).lean().exec();
  if (note) {
    return res
      .status(400)
      .json({ message: "Garden has notes, please delete them first" });
  }
  const garden = await Garden.findById(id).exec();
  if (!garden) {
    return res.status(404).json({ message: "Garden not found" });
  }
  const result = await garden.deleteOne();
  if (result) {
    res.status(200).json({ message: "Garden deleted successfully" });
  } else {
    res.status(400).json({ message: "Failed to delete garden" });
  }
});
module.exports = {
  getAllGardens,
  createGarden,
  updateGarden,
  addGardenNote,
  deleteGardenNote,
  deleteGarden,
};
