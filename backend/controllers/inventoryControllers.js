const asyncHandler = require("express-async-handler");
const Garden = require("../models/Garden");

const Inventory = require("../models/Inventory");

const getAllInventorys = asyncHandler(async (req, res) => {
  // Get all inventorys from MongoDB
  const inventorys = await Inventory.find().lean();

  if (!inventorys?.length) {
    return res.status(404).json({ message: "No inventorys found" });
  }
  res.json(inventorys);
});
const getAllInventorysUser = asyncHandler(async (req, res) => {
  // Get all inventorys from MongoDB
  const inventorys = await Inventory.find().lean();

  // If no inventorys
  if (!inventorys?.length) {
    return res.status(400).json({ message: "No inventorys found" });
  }

  // Add username to each inventory before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const inventorysWithUser = await Promise.all(
    inventorys.map(async (inventory) => {
      const user = await User.findById(inventory.user).lean().exec();
      return { ...inventory, username: user.username };
    })
  );

  res.json(inventorysWithUser);
});

//getallinventorys garden?
const getAllInventorysGarden = asyncHandler(async (req, res) => {
  const inventorys = await Inventory.find().lean();
  if (!inventorys?.length) {
    return res.status(400).json({ message: "No inventorys found" });
  }
  // You could also do this with a for...of loop
  const inventorysWithGarden = await Promise.all(
    inventorys.map(async (inventory) => {
      const garden = await Garden.findById(inventory.garden).lean().exec();
      return { ...inventory, name: garden.name };
    })
  );

  res.json(inventorysWithGarden);
});
// getallinventorys populate garden and user?
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
  const { garden, user, title, text } = req.body;

  // Confirm data
  if (!garden || !item || !quantity || !itemType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate title
  const duplicate = await Inventory.findOne({ item }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate inventory item" });
  }

  // Create and store the new user
  const inventory = await Inventory.create({
    garden,
    item,
    quantity,
    itemType,
  });

  if (inventory) {
    // Created
    return res.status(201).json({ message: "New inventory created" });
  } else {
    return res.status(400).json({ message: "Invalid inventory data received" });
  }
});

const updateInventory = asyncHandler(async (req, res) => {
  const { id, item, quantity, itemType } = req.body;

  // Confirm data
  if (!id || !item || !quantity || !itemType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm inventory exists to update
  const inventory = await Inventory.findById(id).exec();

  if (!inventory) {
    return res.status(400).json({ message: "Inventory not found" });
  }

  // Check for duplicate title
  const duplicate = await Inventory.findOne({ item }).lean().exec();

  // Allow renaming of the original inventory
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

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Inventory ID required" });
  }

  // Confirm inventory exists to delete
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
