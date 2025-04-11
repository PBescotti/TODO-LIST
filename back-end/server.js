require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./db");
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/lists', listRoutes);

(async () => {
  await connectToDB(); // Connessione al DB
  // Solo dopo il DB, parte il server
  app.listen(9999, () => {
    console.log(`🚀 Server avviato su http://localhost:${9999}`);
  });
})();

app.get("/test", (req, res) => {
  console.log("partito");
  res.json({ test: "kebabi" });
});
