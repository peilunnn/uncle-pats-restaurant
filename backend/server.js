const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Item } = require("./db.js");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
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

app.post("/create", async (req, res) => {
  try {
    const itemData = {
      id: uuidv4(),
      ...req.body,
    };

    const item = await Item.create(itemData);
    res.json(item);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/update/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const itemToUpdate = await Item.findOne({ where: { id: itemId } });

    if (!itemToUpdate) {
      return res.status(404).json({ error: "Item not found" });
    }

    await itemToUpdate.update(req.body);
    res.json(itemToUpdate);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const itemToDelete = await Item.findOne({ where: { id: itemId } });

    if (!itemToDelete) {
      return res.status(404).json({ error: "Item not found" });
    }

    await itemToDelete.destroy();
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
