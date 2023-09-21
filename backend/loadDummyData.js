const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./online-store.db");
const { v4: uuidv4 } = require("uuid");

const dummyItems = [
  {
    id: uuidv4(),
    name: "Poke Bowl",
    description: "A refreshing bowl with raw fish, rice, and various toppings.",
    price: 15.99,
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80",
  },
  {
    id: uuidv4(),
    name: "Strawberry Shortcake",
    description: "A delightful dessert layered with strawberries and cream.",
    price: 7.99,
    imageUrl:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2565&q=80",
  },
  {
    id: uuidv4(),
    name: "Sandwich with Soft Boiled Eggs",
    description:
      "A hearty sandwich topped with three perfectly soft-boiled eggs.",
    price: 8.99,
    imageUrl:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2510&q=80",
  },
  {
    id: uuidv4(),
    name: "Salmon in Soya Sauce",
    description: "Delectable salmon marinated in a rich soya sauce.",
    price: 18.99,
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
  },
  {
    id: uuidv4(),
    name: "Burger",
    description: "Juicy and flavorful, this burger is a classic favorite.",
    price: 10.99,
    imageUrl:
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: uuidv4(),
    name: "Strawberry Ice Cream",
    description: "Creamy strawberry ice cream made with fresh strawberries.",
    price: 5.99,
    imageUrl:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: uuidv4(),
    name: "Big Shrimps",
    description: "Two succulent big shrimps, cooked to perfection.",
    price: 14.99,
    imageUrl:
      "https://images.unsplash.com/photo-1559742811-822873691df8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
  },
  {
    id: uuidv4(),
    name: "Plate of Mussels",
    description: "Fresh mussels steamed and served in a delightful sauce.",
    price: 16.99,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1674498271189-f412079580c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
  },
  {
    id: uuidv4(),
    name: "Four Big Shrimps",
    description: "Four appetizing large shrimps cooked to a golden hue.",
    price: 19.99,
    imageUrl:
      "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
  },
  {
    id: uuidv4(),
    name: "Octopus Legs",
    description: "Tender octopus legs seasoned and roasted to perfection.",
    price: 18.99,
    imageUrl:
      "https://images.unsplash.com/photo-1582629413153-f78e0c252cf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
  },
  {
    id: uuidv4(),
    name: "Seafood Platter",
    description:
      "A delicious assortment of seafood items, perfect for sharing.",
    price: 27.99,
    imageUrl:
      "https://images.unsplash.com/photo-1557267725-c530b236f446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: uuidv4(),
    name: "BLT Sandwich",
    description:
      "Classic BLT sandwich packed with crispy bacon, fresh lettuce, and juicy tomatoes.",
    price: 8.99,
    imageUrl:
      "https://images.unsplash.com/photo-1553909489-cd47e0907980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2525&q=80",
  },
  {
    id: uuidv4(),
    name: "Grilled Cheese Sandwich",
    description:
      "Warm and cheesy, this grilled cheese sandwich is pure comfort food.",
    price: 6.99,
    imageUrl:
      "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
  },
  {
    id: uuidv4(),
    name: "Sushi Roll",
    description: "Delicately crafted sushi roll filled with fresh ingredients.",
    price: 10.99,
    imageUrl:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2270&q=80",
  },
  {
    id: uuidv4(),
    name: "Sushi Platter",
    description: "An array of sushi varieties for the sushi enthusiast.",
    price: 24.99,
    imageUrl:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2525&q=80",
  },
];

dummyItems.forEach((item) => {
  db.run(
    `INSERT INTO items (id, name, description, price, imageUrl) VALUES (?, ?, ?, ?, ?)`,
    [item.id, item.name, item.description, item.price, item.imageUrl],
    (err) => {
      if (err) {
        console.error("Error inserting item:", err.message);
      }
    }
  );
});
