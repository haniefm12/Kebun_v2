const asyncHandler = require("express-async-handler");
const Garden = require("../models/Garden");

const Finance = require("../models/Finance");

const getAllFinances = asyncHandler(async (req, res) => {
  // Get all finances from MongoDB
  const finances = await Finance.find().lean();

  if (!finances?.length) {
    return res.status(404).json({ message: "No finances found" });
  }
  res.json(finances);
});
const getAllFinancesUser = asyncHandler(async (req, res) => {
  // Get all finances from MongoDB
  const finances = await Finance.find().lean();

  // If no finances
  if (!finances?.length) {
    return res.status(400).json({ message: "No finances found" });
  }

  // Add username to each finance before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const financesWithUser = await Promise.all(
    finances.map(async (finance) => {
      const user = await User.findById(finance.user).lean().exec();
      return { ...finance, username: user.username };
    })
  );

  res.json(financesWithUser);
});

//getallfinances garden?
const getAllFinancesGarden = asyncHandler(async (req, res) => {
  const finances = await Finance.find().lean();
  if (!finances?.length) {
    return res.status(400).json({ message: "No finances found" });
  }
  // You could also do this with a for...of loop
  const financesWithGarden = await Promise.all(
    finances.map(async (finance) => {
      const garden = await Garden.findById(finance.garden).lean().exec();
      return { ...finance, name: garden.name };
    })
  );

  res.json(financesWithGarden);
});
// getallfinances populate garden and user?
const getAllFinancesPopulate = asyncHandler(async (req, res) => {
  const finances = await Finance.find()
    .populate("user", "username")
    .populate("garden", "name")
    .lean();
  if (!finances?.length) {
    return res.status(400).json({ message: "No finances found" });
  }
  res.json(finances);
});

const createNewFinance = asyncHandler(async (req, res) => {
  const { garden, supplier, item, quantity, unitPrice, totalCost, itemType } =
    req.body;

  // Confirm data
  if (
    !garden ||
    !supplier ||
    !item ||
    !quantity ||
    !unitPrice ||
    !totalCost ||
    !itemType
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate title
  // const duplicate = await Finance.findOne({ id }).lean().exec();

  // if (duplicate) {
  //   return res.status(409).json({ message: "Duplicate finance " });
  // }

  // Create and store the new user
  const finance = await Finance.create({
    garden,
    supplier,
    item,
    quantity,
    unitPrice,
    totalCost,
    itemType,
  });

  if (finance) {
    // Created
    return res.status(201).json({ message: "New finance created" });
  } else {
    return res.status(400).json({ message: "Invalid finance data received" });
  }
});

const updateFinance = asyncHandler(async (req, res) => {
  const {
    id,
    garden,
    supplier,
    item,
    quantity,
    unitPrice,
    totalCost,
    itemType,
  } = req.body;

  // Confirm data
  if (
    !id ||
    !supplier ||
    !item ||
    !quantity ||
    !unitPrice ||
    !totalCost ||
    !itemType
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm finance exists to update
  const finance = await Finance.findById(id).exec();

  if (!finance) {
    return res.status(400).json({ message: "Finance not found" });
  }

  // Check for duplicate title
  // const duplicate = await Finance.findOne({ title }).lean().exec();

  // // Allow renaming of the original finance
  // if (duplicate && duplicate?._id.toString() !== id) {
  //   return res.status(409).json({ message: "Duplicate finance title" });
  // }

  finance.garden = garden;
  finance.title = title;
  finance.text = text;
  finance.completed = completed;

  const updatedFinance = await finance.save();

  res.json(`'${updatedFinance.id}' updated`);
});

const deleteFinance = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Finance ID required" });
  }

  // Confirm finance exists to delete
  const finance = await Finance.findById(id).exec();

  if (!finance) {
    return res.status(400).json({ message: "Finance not found" });
  }

  const result = await finance.deleteOne();

  const reply = `Finance '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllFinances,
  getAllFinancesGarden,
  getAllFinancesPopulate,
  createNewFinance,
  updateFinance,
  deleteFinance,
};
