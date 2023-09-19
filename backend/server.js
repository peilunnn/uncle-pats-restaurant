const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Item } = require("./db.js");
const { v4: uuidv4 } = require("uuid");
const logger = require("./logger");

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
    logger.info("Items retrieved successfully.");
    res.json(items);
  } catch (error) {
    logger.error(`Error retrieving items: ${error}`);
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
    logger.info(`Item created with ID: ${item.id}`);
    res.json(item);
  } catch (error) {
    logger.error(`Error creating item: ${error}`);
    res.status(500).json({ error: error.message });
  }
});

app.put("/update/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const itemToUpdate = await Item.findOne({ where: { id: itemId } });

    if (!itemToUpdate) {
      logger.warn(`Attempt to update non-existing item with ID: ${itemId}`);
      return res.status(404).json({ error: "Item not found" });
    }

    await itemToUpdate.update(req.body);
    logger.info(`Item with ID: ${itemId} updated successfully.`);
    res.json(itemToUpdate);
  } catch (error) {
    logger.error(`Error updating item with ID: ${itemId}: ${error}`);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const itemToDelete = await Item.findOne({ where: { id: itemId } });

    if (!itemToDelete) {
      logger.warn(`Attempt to delete non-existing item with ID: ${itemId}`);
      return res.status(404).json({ error: "Item not found" });
    }

    await itemToDelete.destroy();
    logger.info(`Item with ID: ${itemId} deleted successfully.`);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting item with ID: ${itemId}: ${error}`);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});