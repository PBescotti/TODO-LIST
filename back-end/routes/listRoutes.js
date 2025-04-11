const express = require("express");
const lists = require("../models/lists");
const router = express.Router();

router.get("/", async (req, res) => {
    const result = await lists.getAllLists()
    res.status(200).json(result)
})

router.post("/create_list", async (req, res) => {
    const result = await lists.createList(req.body)
    res.status(200).json(result)
})

module.exports = router;