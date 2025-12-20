"use client";

import Sidebar from "@/components/Sidebar";
import BookDetail from "../components/BookDetail";
import { useState } from "react";
import Header from "@/components/Header";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<any>(null);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="shrink-0 border-b">
        <Header />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar onSelectBookForMain={setSelectedBook} />

        <BookDetail book={selectedBook} />
      </div>
    </div>
  );
}
