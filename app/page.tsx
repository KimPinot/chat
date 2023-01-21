"use client";

import { Message } from "@prisma/client";
import classcat from "classcat";
import { FormEvent, useEffect, useState } from "react";

import { useSocketProvider } from "providers/SocketProvider";

export default function Home() {
  const socket = useSocketProvider();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket?.on("connect", () => console.log("connected"));
    socket?.on("message", handleNewMessage);
  }, [socket]);

  function handleNewMessage(message: Message) {
    setMessages((messages) => [...messages, message]);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { value } = e.currentTarget["content"];
    socket?.emit("message", value);
    e.currentTarget["content"].value = "";
  }

  return (
    <>
      <div className="h-[calc(100vh-48px)] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={String(message.createdAt)}
            className={classcat(["chat", message.author === socket?.id ? "chat-end" : "chat-start"])}
          >
            <div className="chat-header">{message.author}</div>
            <div className="chat-bubble">{message.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-group sticky bottom-0">
        <input type="text" name="content" placeholder="text something..." className="input-bordered input w-full" />
        <button type="submit" className="btn btn-primary">
          Submit!
        </button>
      </form>
    </>
  );
}
