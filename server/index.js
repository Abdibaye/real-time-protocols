import express from "express"
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json()); // To parse JSON bodies

// SSE endpoint
app.get("/events", (req, res) => {
  // Tell the client this is an Event Stream
  res.setHeader("Content-Type", "text/event-stream");
  // res.setHeader("Cache-Control", "no-cache");
  // res.setHeader("Connection", "keep-alive");

  // // Optional: allow CORS during testing
  // res.setHeader("Access-Control-Allow-Origin", "*");

  let counter = 0;

  // send an initial message
  res.write(`data: Connected to SSE stream\n\n`);

  const interval = setInterval(() => {
    counter++;
    res.write(`data: Message #${counter} at ${new Date().toLocaleTimeString()}\n\n`);
  }, 3000);

  setTimeout(() => {
    res.end()
  },15000)
  // Clean up if client disconnects
  req.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

// New POST endpoint to process user input
app.post("/process", (req, res) => {
  const { input } = req.body;
  if (!input) {
    return res.status(400).json({ error: "Input is required" });
  }
  
  const processedData = `Processed: ${input.toUpperCase()}`;
  res.json({ data: processedData });
});

// normal route
app.get("/", (req, res) => {
  res.send("Hello, TypeScript + Express + SSE!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
