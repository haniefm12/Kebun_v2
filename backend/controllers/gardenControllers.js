const asyncHandler = require("express-async-handler");
const Garden = require("../models/Garden");
const Note = require("../models/Note");

const getAllGardens = asyncHandler(async (req, res) => {
  const gardens = await Garden.find().lean();
  if (!gardens?.length) {
    return res.status(404).json({ message: "No garden found" });
  }
  res.json(gardens);
});

const createGarden = asyncHandler(async (req, res) => {
  const { name, address, area } = req.body;
  if (!name || !address || !area) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const existingGarden = await Garden.findOne({ name });
  if (existingGarden) {
    return res
      .status(400)
      .json({ message: "Garden with this name already exists" });
  }

  const garden = await Garden.create({ name, address, area });
  res.status(201).json({ message: "Garden created successfully", garden });
});

const updateGarden = asyncHandler(async (req, res) => {
  const { id, name, address, area, image, description, status } = req.body;
  if (!id || !name || !address || !area) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const garden = await Garden.findById(id).exec();
  if (!garden) {
    return res.status(404).json({ message: "Garden not found" });
  }
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
  res.json({ message: "Garden updated successfully", garden: updatedGarden });
});

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
  res.json({
    message: "Garden note added successfully",
    garden: updatedGarden,
  });
});

const deleteGardenNote = asyncHandler(async (req, res) => {
  try {
    const gardenId = req.params.id;
    const noteToRemove = req.body.note;

    const garden = await Garden.findByIdAndUpdate(
      gardenId,
      {
        $pull: { notes: { note: noteToRemove } },
      },
      { new: true }
    );

    res.json(garden);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating garden" });
  }
});

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
    res.status(400).json({ message: "Failed todelete garden" });
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
