import express from "express";
const app = express();

app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Speedtest API is running successfully!");
});

// 🧩 Speedtest endpoints
app.get("/api/speedtest", (req, res) => {
  res.json({
    token: "school-lab-token",
    urls: [
      "https://d9e385e3-f7db-40a5-9dcf-8f0107786837-00-1jel11l1ge05x.pike.replit.dev/api/download",
      "https://d9e385e3-f7db-40a5-9dcf-8f0107786837-00-1jel11l1ge05x.pike.replit.dev/api/upload"
    ]
  });
});

app.get("/api/download", (req, res) => {
  res.setHeader("Content-Type", "application/octet-stream");
  const chunk = Buffer.alloc(8192, "0");
  const size = 5 * 1024 * 1024;
  for (let i = 0; i < size / 8192; i++) res.write(chunk);
  res.end();
});

app.post("/api/upload", (req, res) => {
  let receivedBytes = 0;
  req.on("data", chunk => (receivedBytes += chunk.length));
  req.on("end", () => res.json({ received: receivedBytes }));
});

app.post("/api/logs", (req, res) => {
  console.log("📘 Log Received:", req.body);
  res.json({ status: "logged" });
});

// ✅ Must use Replit’s port + host
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
