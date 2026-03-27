const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Soups", "Starters", "Pasta & Continental", "Indian Main Course", "Rice & Breads", "Desserts", "Beverages"],
        },
        image: {
            type: String,
            default: "https://via.placeholder.com/150",
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        isChefSpecial: {
            type: Boolean,
            default: false,
        },
        isVeg: {
            type: Boolean,
            default: true,
        },
        preparationTime: {
            type: Number, // in minutes
            default: 15,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
