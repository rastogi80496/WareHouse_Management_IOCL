const Notification = require("../models/Notificationmodel");

/**
 * Checks product quantity and creates/deletes notifications accordingly
 * Creates notification when quantity is 0, removes notification when quantity > 0
 * @param {Object} product - The product object with name, quantity, and _id
 * @param {Object} io - Socket.IO instance to emit notifications
 * @returns {Promise<Object|null>} - The created notification or null
 */
module.exports.checkProductQuantityAndNotify = async (product, io) => {
  try {
    const productId = product._id || product.id;
    
    // Check if product quantity is zero
    if (product.quantity === 0) {
      // Check if notification already exists for this product
      const existingNotification = await Notification.findOne({
        productId: productId,
        type: "Product Out of Stock"
      });

      // Only create notification if it doesn't already exist
      if (!existingNotification) {
        const notification = new Notification({
          name: `${product.name} is out of stock`,
          type: "Product Out of Stock",
          productId: productId,
        });

        await notification.save();

        // Emit notification to all users via Socket.IO
        if (io) {
          io.emit("newNotification", notification);
        }

        return notification;
      }

      return existingNotification;
    } else {
      // Product quantity is greater than 0, remove any existing notifications
      const deletedNotifications = await Notification.deleteMany({
        productId: productId,
        type: "Product Out of Stock"
      });

      // If notifications were deleted, emit update to clients
      if (deletedNotifications.deletedCount > 0 && io) {
        io.emit("notificationRemoved", { productId: productId });
      }

      return null;
    }
  } catch (error) {
    console.error("Error managing product quantity notification:", error);
    return null; // Don't throw error, just log it so it doesn't break the main flow
  }
};
