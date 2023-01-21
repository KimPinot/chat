"use client";

import "styles/taiwindcss.css";
import "styles/globals.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        {children}
        <ToastContainer position="top-center" pauseOnFocusLoss={false} />
      </body>
    </html>
  );
}
