const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

// Sync DB and start server
db.sequelize.sync().then(() => {
  console.log("Database synced.");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
