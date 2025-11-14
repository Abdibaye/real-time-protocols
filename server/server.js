import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.send("Welcome client!");

  socket.on("message", (message) => {
    console.log("Received:", message.toString());

    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message.toString());
      }
    });
  });

  socket.on("close", () => console.log("Client disconnected"));
});

app.get("/", (req, res) => {
  res.send("WebSocket Server Running");
});

server.listen(3001, () => console.log("Server on http://localhost:3001"));
