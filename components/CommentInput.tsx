"use client";
import { useState } from "react";

export default function CommentInput({
  onAdd,
}: {
  onAdd: (page: string, text: string) => void;
}) {
  const [page, setPage] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return; // 내용이 없으면 중단
    onAdd(page, text);
    setPage(""); // 입력 후 칸 비우기
    setText("");
  };

  return (
    <footer className="p-4 flex gap-2 items-center border-t bg-white">
      <input
        value={page}
        onChange={(e) => setPage(e.target.value)}
        className="w-16 border p-2 text-sm text-center"
        placeholder="P"
      />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()} // 엔터키 지원
        className="flex-1 border p-2 text-sm"
        placeholder="기록을 남겨보세요..."
      />
      <button
        onClick={handleSubmit}
        className="p-2 text-blue-500 hover:scale-110 transition"
      >
        ✈️
      </button>
    </footer>
  );
}
