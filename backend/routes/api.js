const express = require('express');
const router = express.Router();
const UserData = require('../models/UserData');

router.post('/save', async (req, res) => {
  try {
    const { site, timeSpent } = req.body;
    const data = new UserData({ site, timeSpent });
    await data.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/report', async (req, res) => {
  try {
    const report = await UserData.find({});
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
