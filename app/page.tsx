"use client";

import { setCookie } from "cookies-next";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";

import { TOKEN, useSocketProvider } from "providers/SocketProvider";

export default function Home() {
  const socket = useSocketProvider();
  const [token, setToken] = useAtom(TOKEN);
  const { push } = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const room = e.currentTarget.room.value;
    socket?.emit("join_room", room, (room_id: string) => push(`/room/${room_id}`));
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      const { token } = await (
        await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
      ).json();
      setCookie("token", token);
      setToken(token);
    } catch (e) {
      toast("Failed To Login", { type: "error" });
      console.error(e);
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      {!token ? (
        <form onSubmit={handleLogin} className="flex flex-col">
          <input type="email" name="email" placeholder="email" className="input-bordered input" />
          <input type="password" name="password" placeholder="password" className="input-bordered input" />
          <button className="btn-primary btn">join</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="room" placeholder="room_id" className="input-bordered input" />
          <button className="btn-primary btn">join</button>
        </form>
      )}
    </div>
  );
}
