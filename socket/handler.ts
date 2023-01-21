import { Server, Socket } from "socket.io";

import { database } from "utils/prisma";

export function socketHandler(io: Server, socket: Socket) {
  console.log("New client connected", socket.id);

  socket.on("message", async (data) => {
    const message = await database.message.create({
      data: {
        content: data,
        author: socket.id,
      },
    });
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
}
