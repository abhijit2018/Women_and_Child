const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors'); 
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const captureRequestInfo = require("../../pkg/utils/middleware");
app.use(captureRequestInfo);
const userDataRoutes = require("../../api/v1/user");
app.use("/api/v1", userDataRoutes);

const typesOfCrimeRoutes = require("../../api/v1/typesOfCrime");
app.use("/api/v1", typesOfCrimeRoutes); 


const uploadsPath = path.join(__dirname, "../../web/uploads");
app.use("/organization", express.static(path.join(uploadsPath, "profile")));
app.use("/uploads", express.static(uploadsPath));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
