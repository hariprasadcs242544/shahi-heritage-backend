const TableBooking = require("../models/TableBooking");

// Create a new table booking
exports.createBooking = async (req, res) => {
    try {
        const booking = await TableBooking.create(req.body);
        res.status(201).json({ success: true, message: "Table booked successfully", data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error booking table", error: error.message });
    }
};

// Get all bookings (Admin/Staff view)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await TableBooking.find().sort({ date: 1, time: 1 });
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching bookings", error: error.message });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await TableBooking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Update booking status or details
exports.updateBooking = async (req, res) => {
    try {
        const booking = await TableBooking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error updating booking", error: error.message });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await TableBooking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        res.status(200).json({ success: true, message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting booking", error: error.message });
    }
};
