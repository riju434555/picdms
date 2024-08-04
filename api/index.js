// Import necessary modules
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

// Import route modules
const authRoute = require("./routes/authRoute");
const customerRoute = require("./routes/customerRoute");
const projectRoute = require("./routes/projectRoute");
const timelineRoute = require("./routes/timelineRoute");
const messageRoute = require("./routes/messageingRoute");
const allIdRoute = require("./routes/allIdRoute");

// Initialize environment variables
dotenv.config();

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from other domains
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define API routes for different functionalities
app.use("/v1/customer", customerRoute);
app.use("/v1/user", authRoute);
app.use("/v1/project", projectRoute);
app.use("/v1/timeline", timelineRoute);
app.use("/v1/message", messageRoute);
app.use("/v1/allId", allIdRoute);

// Assume you have an environment variable for the upload directory path
const uploadDir = process.env.UPLOAD_DIR || "uploads";

// Serve static files (e.g., uploaded images) from the 'uploads' directory
// app.use(
//   "/uploads",
//   express.static(
//     path.join(
//       "D:\\project\\my project\\myRecent\\react\\crm\\server",
//       "uploads"
//     )
//   )
// );
app.use("/uploads", express.static(path.join(__dirname, uploadDir)));

// Log the current directory for debugging purposes
console.log(__dirname);

// Configure Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where uploaded files should be saved
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Create a unique filename by appending a timestamp to the original filename
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create a Multer instance with the configured storage
const upload = multer({ storage: storage });

// Define a POST route for handling file uploads
app.post("/upload", upload.single("profileImage"), (req, res) => {
  // Generate the URL of the uploaded file
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  // Respond with the URL of the uploaded file
  res.setHeader("Content-Type", "application/json");
  res.json({ fileUrl: fileUrl });
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the Express server on port 8080
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  // console.log(`Database Host: ${process.env.DB_HOST}`);
});
