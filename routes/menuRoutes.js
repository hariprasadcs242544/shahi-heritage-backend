const express = require("express");
const { getMenu, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem } = require("../controllers/menuController");

const router = express.Router();

router.route("/")
    .get(getMenu) // Public access
    .post(createMenuItem); // Should be admin realistically

router.route("/:id")
    .get(getMenuItemById)
    .put(updateMenuItem)
    .delete(deleteMenuItem);

module.exports = router;
