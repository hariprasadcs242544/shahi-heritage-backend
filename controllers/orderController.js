const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// Place a new order
exports.createOrder = async (req, res) => {
    try {
        const { customerDetails, orderType, tableNumber, deliveryAddress, items, paymentStatus, specialInstructions } = req.body;

        // Validate Items & Calculate Total
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const menuItem = await MenuItem.findById(item.menuItem);
            if (!menuItem) {
                return res.status(404).json({ success: false, message: `Menu item with id ${item.menuItem} not found` });
            }

            const price = menuItem.price;
            const quantity = item.quantity;
            totalAmount += price * quantity;

            orderItems.push({
                menuItem: menuItem._id,
                name: menuItem.name,
                quantity,
                price,
            });
        }

        const newOrder = await Order.create({
            customerDetails,
            orderType,
            tableNumber: orderType === "Dine-In" ? tableNumber : null,
            deliveryAddress: orderType === "Delivery" ? deliveryAddress : null,
            items: orderItems,
            totalAmount,
            paymentStatus: paymentStatus || "Pending",
            specialInstructions: specialInstructions || "",
        });

        res.status(201).json({ success: true, message: "Order placed successfully", data: newOrder });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to place order", error: error.message });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        // Optionally filter by statuses or type (query params)
        const { orderStatus, orderType } = req.query;
        let query = {};
        if (orderStatus) query.orderStatus = orderStatus;
        if (orderType) query.orderType = orderType;

        const orders = await Order.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
    }
};

// Get single order
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Update order status/details
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, paymentStatus } = req.body;
        let updateFields = {};
        if (orderStatus) updateFields.orderStatus = orderStatus;
        if (paymentStatus) updateFields.paymentStatus = paymentStatus;

        const order = await Order.findByIdAndUpdate(req.params.id, updateFields, {
            new: true,
            runValidators: true,
        });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, message: "Order updated", data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to update order", error: error.message });
    }
};

// Delete order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting order", error: error.message });
    }
};
