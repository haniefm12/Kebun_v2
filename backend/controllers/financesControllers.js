const asyncHandler = require("express-async-handler");
const Garden = require("../models/Garden");
const Finance = require("../models/Finance");
const getAllFinances = asyncHandler(async (req, res) => {
  const finances = await Finance.find().lean();
  if (!finances?.length) {
    return res.status(404).json({ message: "No finances found" });
  }
  res.json(finances);
});
const getAllFinancesUser = asyncHandler(async (req, res) => {
  const finances = await Finance.find().lean();
  if (!finances?.length) {
    return res.status(400).json({ message: "No finances found" });
  }
  const financesWithUser = await Promise.all(
    finances.map(async (finance) => {
      const user = await User.findById(finance.user).lean().exec();
      return { ...finance, username: user.username };
    })
  );
  res.json(financesWithUser);
});
const getAllFinancesGarden = asyncHandler(async (req, res) => {
  const finances = await Finance.find().lean();
  if (!finances?.length) {
    return res.status(400).json({ message: "No finances found" });
  }
  const financesWithGarden = await Promise.all(
    finances.map(async (finance) => {
      const garden = await Garden.findById(finance.garden).lean().exec();
      return { ...finance, name: garden.name };
    })
  );

  res.json(financesWithGarden);
});
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
  const finance = await Finance.findById(id).exec();
  if (!finance) {
    return res.status(400).json({ message: "Finance not found" });
  }
  finance.garden = garden;
  finance.item = item;
  finance.itemType = itemType;
  finance.quantity = quantity;
  finance.unitPrice = unitPrice;
  finance.totalCost = totalCost;
  finance.supplier = supplier;
  const updatedFinance = await finance.save();
  res.json(`'${updatedFinance.id}' updated`);
});
const deleteFinance = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Finance ID required" });
  }
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
