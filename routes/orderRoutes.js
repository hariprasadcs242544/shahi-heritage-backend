const express = require("express");
const { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } = require("../controllers/orderController");

const router = express.Router();

router.route("/")
    .post(createOrder)
    .get(getAllOrders);

router.route("/:id")
    .get(getOrderById)
    .put(updateOrderStatus)
    .delete(deleteOrder);

module.exports = router;
