import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { socketHandler } from "socket/handler";
import { NextApiResponseServerIO } from "types/next";

// custom config for disable bodyParser (https://nextjs.org/docs/api-routes/api-middlewares#custom-config)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new ServerIO(res.socket.server as any);
  res.socket.server.io = io;

  // Define actions inside
  io.on("connection", (socket) => socketHandler(io, socket));

  console.log("Setting up socket");
  res.end();
}
