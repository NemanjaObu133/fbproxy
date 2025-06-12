import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/adaccounts", async (req, res) => {
  try {
    const accessToken = process.env.FB_ACCESS_TOKEN;
    const url = `https://graph.facebook.com/v19.0/me/adaccounts?fields=name,id,account_status,amount_spent,spend_cap&access_token=${accessToken}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data from Facebook API.", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
