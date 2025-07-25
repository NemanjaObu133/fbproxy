const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("*", async (req, res) => {
  const url = `https://graph.facebook.com/v19.0${req.originalUrl}`;
  try {
    const fbRes = await fetch(url);
    const data = await fbRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
