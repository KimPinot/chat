"use client";

import { useEffect } from "react";

import { useSocketProvider } from "providers/SocketProvider";

export default function Home() {
  const socket = useSocketProvider();

  useEffect(() => {
    socket?.on("connect", () => console.log("connected"));
  }, [socket]);

  return <h1>Hello World!</h1>;
}
