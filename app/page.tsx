"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

import { useSocketProvider } from "providers/SocketProvider";

export default function Home() {
  const socket = useSocketProvider();
  const { push } = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const room = e.currentTarget.room.value;
    socket?.emit("join_room", room, (room_id: string) => push(`/room/${room_id}`));
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit}>
        <input type="text" name="room" placeholder="room_id" className="input-bordered input" />
        <button className="btn-primary btn">join</button>
      </form>
    </div>
  );
}
