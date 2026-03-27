const express = require("express");
const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } = require("../controllers/tableBookingController");

const router = express.Router();

router.route("/")
    .get(getAllBookings) // Admin dashboard
    .post(createBooking); // Customer booking

router.route("/:id")
    .get(getBookingById)
    .put(updateBooking)
    .delete(deleteBooking);

module.exports = router;
