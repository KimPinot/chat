"use client";

import "styles/taiwindcss.css";
import "styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import { SocketProvider } from "providers/SocketProvider";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <SocketProvider>{children}</SocketProvider>
        <ToastContainer position="top-center" pauseOnFocusLoss={false} pauseOnHover={false} />
      </body>
    </html>
  );
}
