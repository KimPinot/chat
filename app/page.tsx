"use client";

import { io } from "socket.io-client";
import useAsyncEffect from "use-async-effect";

const handler = async () => {
  await fetch("/api/socket");
  const socket = io();
  return socket;
};

export default function Home() {
  useAsyncEffect(async () => {
    const socket = await handler();
    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);

  return <h1>Hello World!</h1>;
}
