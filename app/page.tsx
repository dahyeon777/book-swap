"use client";

import Sidebar from "@/components/Sidebar";
import BookDetail from "../components/BookDetail";
import { useState } from "react";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<any>(null);

  return (
    <div className="flex h-screen">
      {/* 함수 이름을 Sidebar 내부 props와 맞췄습니다. */}
      <Sidebar onSelectBookForMain={setSelectedBook} />

      {/* 메인 영역 */}
      <BookDetail book={selectedBook} />
    </div>
  );
}
