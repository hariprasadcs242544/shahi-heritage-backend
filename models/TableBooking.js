const mongoose = require("mongoose");



const tableBookingSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
        },
        date: {
            type: String, // YYYY-MM-DD
            required: true,
        },
        time: {
            type: String, // HH:MM
            required: true,
        },
        numberOfGuests: {
            type: Number,
            required: true,
            min: 1,
        },
        bookingType: {
            type: String,
            enum: ["Family Dining", "Party Event", "Couple/Standard", "VIP Private Dining"],
            default: "Couple/Standard",
        },
        specialRequests: {
            type: String,
            default: "",
        },
        vegOnly: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
            default: "Pending",
        },
        tableNumber: {
            type: String, // Assigned table number by admin
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TableBooking", tableBookingSchema);
