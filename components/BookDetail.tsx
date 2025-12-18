import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useState } from "react";

export default function BookDetail({ title }: { title: string }) {
  // 1. 댓글 목록을 저장할 배열 상태 (초기값은 예시 데이터)
  const [comments, setComments] = useState([
    { id: 1, page: "23", text: "이 문장 진짜 개쩔어 읽어봐" },
  ]);

  // 2. 새로운 댓글을 추가하는 함수
  const addComment = (page: string, text: string) => {
    const newComment = {
      id: Date.now(), // 고유한 ID 생성
      page: page || "0", // 페이지 미입력 시 0처리
      text: text,
    };
    setComments([...comments, newComment]); // 기존 목록에 새 댓글 추가
  };

  return (
    <main className="flex-1 flex flex-col h-full">
      {/* 상단 정보 */}
      <header className="p-8 flex gap-6">
        <div className="w-32 h-44 bg-[#d9d9d9] flex items-center justify-center text-gray-500">
          책사진
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500 mt-1">저자명 | 2003.09.23</p>
        </div>
      </header>

      {/* 3. 리스트 컴포넌트에 댓글 데이터 전달 */}
      <CommentList comments={comments} />

      {/* 4. 입력 컴포넌트에 추가 함수 전달 */}
      <CommentInput onAdd={addComment} />
    </main>
  );
}
