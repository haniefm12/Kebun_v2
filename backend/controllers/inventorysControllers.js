const asyncHandler = require("express-async-handler");
const Garden = require("../models/Garden");

const Inventory = require("../models/Inventory");

const getAllInventorys = asyncHandler(async (req, res) => {
  const inventorys = await Inventory.find().lean();

  if (!inventorys?.length) {
    return res.status(404).json({ message: "No inventorys found" });
  }
  res.json(inventorys);
});
const getAllInventorysUser = asyncHandler(async (req, res) => {
  const inventorys = await Inventory.find().lean();

  if (!inventorys?.length) {
    return res.status(400).json({ message: "No inventorys found" });
  }

  const inventorysWithUser = await Promise.all(
    inventorys.map(async (inventory) => {
      const user = await User.findById(inventory.user).lean().exec();
      return { ...inventory, username: user.username };
    })
  );

  res.json(inventorysWithUser);
});

const getAllInventorysGarden = asyncHandler(async (req, res) => {
  const inventorys = await Inventory.find().lean();
  if (!inventorys?.length) {
    return res.status(400).json({ message: "No inventorys found" });
  }

  const inventorysWithGarden = await Promise.all(
    inventorys.map(async (inventory) => {
      const garden = await Garden.findById(inventory.garden).lean().exec();
      return { ...inventory, name: garden.name };
    })
  );

  res.json(inventorysWithGarden);
});

const getAllInventorysPopulate = asyncHandler(async (req, res) => {
  const inventorys = await Inventory.find()
    .populate("user", "username")
    .populate("garden", "name")
    .lean();
  if (!inventorys?.length) {
    return res.status(400).json({ message: "No inventorys found" });
  }
  res.json(inventorys);
});

const createNewInventory = asyncHandler(async (req, res) => {
  const { garden, item, quantity, itemType } = req.body;

  if (!garden || !item || !quantity || !itemType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await Inventory.findOne({ item }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate inventory item" });
  }

  const inventory = await Inventory.create({
    garden,
    item,
    quantity,
    itemType,
  });

  if (inventory) {
    return res.status(201).json({ message: "New inventory created" });
  } else {
    return res.status(400).json({ message: "Invalid inventory data received" });
  }
});

const updateInventory = asyncHandler(async (req, res) => {
  const { id, item, quantity, itemType, garden } = req.body;

  if (!id || !item || !quantity || !itemType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const inventory = await Inventory.findById(id).exec();

  if (!inventory) {
    return res.status(400).json({ message: "Inventory not found" });
  }

  const duplicate = await Inventory.findOne({ item }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate inventory item" });
  }

  inventory.garden = garden;
  inventory.item = item;
  inventory.quantity = quantity;
  inventory.itemType = itemType;

  const updatedInventory = await inventory.save();

  res.json(`'${updatedInventory.item}' updated`);
});

const deleteInventory = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Inventory ID required" });
  }

  const inventory = await Inventory.findById(id).exec();

  if (!inventory) {
    return res.status(400).json({ message: "Inventory not found" });
  }

  const result = await inventory.deleteOne();

  const reply = `Inventory '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllInventorys,
  getAllInventorysGarden,
  getAllInventorysPopulate,
  createNewInventory,
  updateInventory,
  deleteInventory,
};
