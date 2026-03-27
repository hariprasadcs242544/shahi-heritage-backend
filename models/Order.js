const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        customerDetails: {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String },
        },
        orderType: {
            type: String,
            enum: ["Dine-In", "Takeaway", "Delivery"],
            required: true,
        },
        tableNumber: {
            type: String, // only if Dine-In
            default: null,
        },
        deliveryAddress: {
            street: String,
            city: String,
            zipCode: String,
        }, // only if Delivery
        items: [
            {
                menuItem: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "MenuItem",
                    required: true,
                },
                name: { type: String, required: true }, // copy for quick lookup
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true }, // price at the time of order
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },
        orderStatus: {
            type: String,
            enum: ["Placed", "Preparing", "Ready", "Out for Delivery", "Completed", "Cancelled"],
            default: "Placed",
        },
        specialInstructions: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
