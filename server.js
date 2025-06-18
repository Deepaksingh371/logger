const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Log IPs when someone visits the site
app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const timestamp = new Date().toISOString();

  const logLine = `${timestamp} - ${ip}\n`;

  // Log to file (note: not persistent on Render free plan)
  fs.appendFile("ip-log.txt", logLine, (err) => {
    if (err) console.error("Error logging IP:", err);
  });

  // Send the index.html
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
