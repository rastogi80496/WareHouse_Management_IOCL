const Sale = require("../models/Salesmodel");
const ProductModel = require('../models/Productmodel');
const { checkProductQuantityAndNotify } = require("../libs/productNotificationHelper");


module.exports.createSale = async (req, res) => {
  try {
    const { customerName, products, paymentMethod, paymentStatus, status } = req.body;

    if (!customerName || !products || !products.product || products.quantity === undefined || products.quantity === null || products.quantity === '' || !products.price || !paymentMethod) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Convert to numbers to ensure type safety
    const quantity = Number(products.quantity);
    const price = Number(products.price);

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Quantity must be a positive number." });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ success: false, message: "Price must be a positive number." });
    }

    const totalAmount = quantity * price;

    const productRecord = await ProductModel.findById(products.product);
    if (!productRecord) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (productRecord.quantity < quantity) {
        return res.status(400).json({ 
            success: false,
            message: "Insufficient product quantity",
            available: productRecord.quantity,
            requested: quantity
        });
    }

    // Update product quantity
    productRecord.quantity -= quantity;
    await productRecord.save();

    // Check if product quantity is zero and create notification
    const io = req.app.get("io");
    if (io) {
      await checkProductQuantityAndNotify(productRecord, io);
    }

    const newSale = new Sale({
      customerName,
      products: {
        product: products.product,
        quantity: quantity,
        price: price
      },
      totalAmount,
      paymentMethod,
      paymentStatus: paymentStatus || "pending",
      status: status || "pending",
    });

    await newSale.save();

   
    
  
    

    res.status(201).json({ success: true, message: "Sale created successfully", sale: newSale });
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ success: false, message: "Error creating sale", error: error.message });
  }
};


module.exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("products.product").sort({ createdAt: -1 });

    res.status(200).json({ success: true, sales });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching sales", error });
  }
};


module.exports.getSaleById = async (req, res) => {
  try {
    const { saleId } = req.params;

    const sale = await Sale.findById(saleId).populate("products.product");

    if (!sale) {
      return res.status(404).json({ success: false, message: "Sale not found" });
    }

    res.status(200).json({ success: true, sale });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching sale", error });
  }
};

module.exports.updateSale = async (req, res) => {
  try {
    const { saleId } = req.params;
    const updatedData = req.body;

  

    if (
      !updatedData ||
      !updatedData.products ||
      !updatedData.products.product ||
      !updatedData.products.quantity ||
      !updatedData.products.price
    ) {
      return res.status(400).json({
        success: false,
        message: "Product, quantity, and price are required."
      });
    }


    const updatedTotalAmount = updatedData.products.quantity * updatedData.products.price;


    const sale = await Sale.findByIdAndUpdate(
      saleId,
      { ...updatedData, totalAmount: updatedTotalAmount },
      { new: true }
    );

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Sale updated successfully",
      sale: sale
    });
  } catch (error) {
    console.error("Error updating sale:", error);
    res.status(500).json({
      success: false,
      message: "Error updating sale",
      error: error.message
    });
  }
};


module.exports.SearchSales = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
     
      const allSales = await Sale.find().populate("products.product");
      return res.status(200).json({ success: true, sales: allSales });
    }

    const searchdata = await Sale.find({
      $or: [
        { customerName: { $regex: query, $options: "i" } },
        { paymentMethod: { $regex: query, $options: "i" } }
      ]
    }).populate("products.product"); 

    res.status(200).json({ sales: searchdata });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error in searching sales", error: error.message });
  }
};
