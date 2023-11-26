import WebSocket, { Server } from "ws";

const wss = new Server({ port: 9090 });

interface Clients {
  [key: string]: WebSocket;
}

const clients: Clients = {};

wss.on("connection", (socket, request) => {
  const queryParams = new URLSearchParams(request.url?.substring(1) || "");
  const browserId = queryParams.get("id");
  if (browserId) {
    clients[browserId] = socket;

    socket.on("message", (message) => {
      Object.keys(clients).forEach((id) => {
        if (id !== browserId && clients[id].readyState === WebSocket.OPEN) {
          clients[id].send(message);
        }
      });
    });

    socket.on("close", () => {
      delete clients[browserId];
    });
  }
});
