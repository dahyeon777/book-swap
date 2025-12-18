// components/CommentInput.tsx
import { useState } from "react";

export default function CommentInput({
  onAdd,
}: {
  onAdd: (page: string, text: string) => void;
}) {
  const [page, setPage] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    if (!text.trim()) return;

    onAdd(page, text);
    setPage("");
    setText("");
  };

  return (
    // 1. footer 대신 form을 사용하고 onSubmit을 연결합니다.
    <form
      onSubmit={handleSubmit}
      className="p-4 flex gap-2 items-center border-t bg-white"
    >
      <input
        required // 2. 필수 입력값으로 설정
        type="number"
        value={page}
        onChange={(e) => setPage(e.target.value)}
        className="w-16 border p-2 text-sm text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="P"
      />

      <input
        required // 3. 내용도 없으면 말풍선이 뜹니다
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border p-2 text-sm"
        placeholder="코멘트를 남겨보세요..."
      />

      {/* 4. button 타입을 submit으로 설정해야 브라우저 검증이 작동합니다. */}
      <button type="submit" className="p-2 text-blue-500">
        ✈️
      </button>
    </form>
  );
}
