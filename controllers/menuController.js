const MenuItem = require("../models/MenuItem");

// Get all menu items
exports.getMenu = async (req, res) => {
    try {
        const { category, isChefSpecial } = req.query;
        let query = {};
        if (category) query.category = category;
        if (isChefSpecial) query.isChefSpecial = isChefSpecial === "true";

        const menu = await MenuItem.find(query);
        res.status(200).json({ success: true, count: menu.length, data: menu });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching menu", error: error.message });
    }
};

// Get a single menu item
exports.getMenuItemById = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Add new menu item (Admin only realistically)
exports.createMenuItem = async (req, res) => {
    try {
        const newItem = await MenuItem.create(req.body);
        res.status(201).json({ success: true, data: newItem });
    } catch (error) {
        res.status(400).json({ success: false, message: "Could not create item", error: error.message });
    }
};

// Update an item
exports.updateMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error updating item", error: error.message });
    }
};

// Delete item
exports.deleteMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        res.status(200).json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting item", error: error.message });
    }
};
