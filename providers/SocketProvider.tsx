import { createContext, ReactNode, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";
import useAsyncEffect from "use-async-effect";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useAsyncEffect(async () => {
    await fetch("/api/socket");
    const _socket = io();
    setSocket(_socket);
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocketProvider = () => useContext(SocketContext);
