require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const helmet = require("helmet");


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });


  

app.use(helmet());
const PORT = process.env.PORT || 1091;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
