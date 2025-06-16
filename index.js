import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/adaccounts", async (req, res) => {
  try {
    const accessToken = process.env.FB_ACCESS_TOKEN;
    let url = `https://graph.facebook.com/v19.0/me/adaccounts?fields=name,id,account_status,amount_spent,spend_cap&access_token=${accessToken}`;
    
    let allData = [];
    while (url) {
      const response = await fetch(url);
      const json = await response.json();

      if (json.data) {
        allData = allData.concat(json.data);
      }

      url = json.paging && json.paging.next ? json.paging.next : null;
    }

    res.json({ data: allData });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
