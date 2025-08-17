const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

// GET all (user)
router.get("/", auth, async (req, res) => {
  const tx = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
  res.json(tx);
});

// POST create
router.post(
  "/",
  auth,
  [
    body("type").isIn(["income", "expense"]),
    body("category").notEmpty(),
    body("amount").isFloat({ gt: 0 }),
    body("date").optional().isISO8601(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { type, category, amount, date, note } = req.body;
    const tx = await Transaction.create({
      user: req.user.id, type, category, amount, date, note,
    });
    res.status(201).json(tx);
  }
);

// PUT update
router.put("/:id", auth, async (req, res) => {
  const updated = await Transaction.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  const del = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!del) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

// GET summary (Phase 4)
router.get("/summary", auth, async (req, res) => {
  const tx = await Transaction.find({ user: req.user.id });
  const income = tx.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = tx.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  res.json({ income, expense, balance: income - expense });
});

module.exports = router;
