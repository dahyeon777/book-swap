// app/page.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import BookDetail from "../components/BookDetail";
import { useState } from "react";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<any>(null);
  return (
    <div className="flex h-screen">
      {/* 사이드바에 책 선택 함수 전달 */}
      <Sidebar onSelectBook={setSelectedBook} />

      {/* 메인 영역에 선택된 책 데이터 전달 */}
      <BookDetail book={selectedBook} />
    </div>
  );
}
