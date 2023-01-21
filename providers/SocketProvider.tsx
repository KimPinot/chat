import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import useAsyncEffect from "use-async-effect";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const initilized = useRef(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useAsyncEffect(async () => {
    if (!initilized.current || !!socket) {
      initilized.current = true;
      return;
    }
    await fetch("/api/socket");
    const _socket = io();
    setSocket(_socket);
    return () => {
      _socket.disconnect();
      setSocket(null);
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocketProvider = () => useContext(SocketContext);
