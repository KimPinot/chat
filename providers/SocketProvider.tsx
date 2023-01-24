import { atom, useAtomValue } from "jotai";
import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import useAsyncEffect from "use-async-effect";

export const TOKEN = atom<string | null>(null);

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const initilized = useRef(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const token = useAtomValue(TOKEN);

  useAsyncEffect(async () => {
    if (!token) return;
    console.log(!!token, !initilized.current, !!socket);
    await fetch("/api/socket");
    const _socket = io();
    setSocket(_socket);
    return () => {
      _socket.disconnect();
      setSocket(null);
    };
  }, [token]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocketProvider = () => useContext(SocketContext);
