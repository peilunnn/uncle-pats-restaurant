const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Item } = require("./db.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/items", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 8;
  const offset = (page - 1) * limit;

  try {
    const items = await Item.findAll({
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
