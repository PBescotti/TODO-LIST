const express = require("express");
const users = require("../models/users");
const router = express.Router();

router.post("/register", async (req, res) => {
  const message = await users.register(req.body);
  if (message.success === false) return res.status(400).json(message);

  res.status(201).json(message);
});

router.post("/login", async (req, res) => {
  const login_success = await users.login(req.body);
  if (!login_success)
    return res.status(401).json({ success: false, error: "INVALID_CREDENTIALS" });

  res.status(200).json({ success: true });
});

module.exports = router;
