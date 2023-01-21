import { Server, Socket } from "socket.io";

export function socketHandler(io: Server, socket: Socket) {
  console.log("New client connected", socket.id);

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
}
