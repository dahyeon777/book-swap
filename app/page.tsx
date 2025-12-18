// app/page.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import BookDetail from "../components/BookDetail";

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar />
      <BookDetail />
    </div>
  );
}
