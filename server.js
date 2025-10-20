import express from "express";
const app = express();
app.use(express.json());

// 🧩 1️⃣ Speedtest Info Endpoint
app.get("/api/speedtest", (req, res) => {
  res.json({
    token: "school-lab-token",
    urls: [
      "https://your-app-name.onrender.com/api/download",
      "https://your-app-name.onrender.com/api/upload"
    ]
  });
});

// 🧩 2️⃣ Download Endpoint — sends ~5MB dummy data
app.get("/api/download", (req, res) => {
  res.setHeader("Content-Type", "application/octet-stream");
  const chunk = Buffer.alloc(8192, "0");
  const size = 5 * 1024 * 1024; // 5 MB
  for (let i = 0; i < size / 8192; i++) res.write(chunk);
  res.end();
});

// 🧩 3️⃣ Upload Endpoint — accepts uploaded data
app.post("/api/upload", (req, res) => {
  let receivedBytes = 0;
  req.on("data", chunk => (receivedBytes += chunk.length));
  req.on("end", () => res.json({ received: receivedBytes }));
});

// 🧩 4️⃣ Logging Endpoint — saves or prints test logs
app.post("/api/logs", (req, res) => {
  console.log("📘 Log Received:", req.body);
  res.json({ status: "logged" });
});

// ✅ Default route for quick check
app.get("/", (req, res) => {
  res.send("✅ Speedtest API is running successfully!");
});

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
