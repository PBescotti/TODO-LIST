const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connesso a MongoDB");
  } catch (error) {
    console.error("❌ Errore connessione al DB:", error);
    process.exit(1); // Esci dall'app se il DB non parte
  }
}

module.exports = connectToDB;
