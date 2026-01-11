const StockTransaction = require("../models/StockTranscationmodel");
const Product = require("../models/Productmodel");
const { checkProductQuantityAndNotify } = require("../libs/productNotificationHelper");

/* ================= CREATE STOCK ================= */
module.exports.createStockTransaction = async (req, res) => {
  try {
    const { product, type, quantity, supplier } = req.body;

    if (!product || !type || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product, type, and quantity are required",
      });
    }

    const qty = Number(quantity);

    const productData = await Product.findById(product);
    if (!productData) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (type === "Stock-in") {
      productData.quantity += qty;
    } else if (type === "Stock-out") {
      if (productData.quantity < qty) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }
      productData.quantity -= qty;
    }

    await productData.save();

    // Check if product quantity is zero and create notification
    const io = req.app.get("io");
    await checkProductQuantityAndNotify(productData, io);

    const transaction = await StockTransaction.create({
      product,
      type,
      quantity: qty,
      supplier,
    });

    res.status(201).json({
      success: true,
      message: "Stock transaction created and product updated",
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating stock transaction",
      error: error.message,
    });
  }
};

/* ================= GET ALL STOCKS ================= */
module.exports.getAllStockTransactions = async (req, res) => {
  try {
    const transactions = await StockTransaction.find()
      .populate("product", "name")
      .populate("supplier", "name")
      .sort({ transactionDate: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching stock transactions",
      error: error.message,
    });
  }
};

/* ================= GET BY PRODUCT ================= */
module.exports.getStockTransactionsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const transactions = await StockTransaction.find({ product: productId })
      .populate("product", "name")
      .populate("supplier", "name")
      .sort({ transactionDate: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching stock by product",
      error: error.message,
    });
  }
};

/* ================= GET BY SUPPLIER ================= */
module.exports.getStockTransactionsBySupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const transactions = await StockTransaction.find({ supplier: supplierId })
      .populate("product", "name")
      .populate("supplier", "name")
      .sort({ transactionDate: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching stock by supplier",
      error: error.message,
    });
  }
};

/* ================= SEARCH STOCK ================= */
module.exports.searchStocks = async (req, res) => {
  try {
    const { query } = req.query;

    const stocks = await StockTransaction.find()
      .populate("product", "name")
      .populate("supplier", "name");

    const filteredStocks = stocks.filter(
      (s) =>
        s.type.toLowerCase().includes(query.toLowerCase()) ||
        s.product?.name.toLowerCase().includes(query.toLowerCase()) ||
        s.supplier?.name.toLowerCase().includes(query.toLowerCase())
    );

    res.status(200).json(filteredStocks);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching stock",
      error: error.message,
    });
  }
};