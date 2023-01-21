import { Message } from "@prisma/client";
import { Server, Socket } from "socket.io";

import { database } from "utils/prisma";

export function socketHandler(io: Server, socket: Socket) {
  console.log("New client connected", socket.id);

  socket.on("message", async (room_id: string, data: string) => {
    const message = await database.message.create({
      data: {
        content: data,
        author: socket.id,
        roomId: room_id,
      },
    });
    io.to(room_id).emit("message", message);
  });

  socket.on("join_room", async (data: string, done) => {
    const room = await database.room.upsert({
      where: {
        id: data,
      },
      create: {
        id: data,
      },
      update: {},
    });
    done(room.id);
  });

  socket.on("connect_room", async (room_id: string, done: (messages: Message[]) => void) => {
    const room = await database.room.findUniqueOrThrow({
      where: {
        id: room_id,
      },
      select: {
        id: true,
        messages: true,
      },
    });
    io.to(room.id).emit("message", {
      author: "system",
      content: "New user joined",
      createdAt: new Date(),
    } as Message);
    socket.join(room.id);
    done(room.messages);
  });

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
}
