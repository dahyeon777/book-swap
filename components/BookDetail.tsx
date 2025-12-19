import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useState } from "react";
import { Book } from "./Sidebar"; // Sidebar에서 만든 타입을 재사용합니다.

// Props 타입을 Book 객체 전체를 받도록 변경
interface BookDetailProps {
  book: Book | null;
}

export default function BookDetail({ book }: BookDetailProps) {
  const [comments, setComments] = useState([
    { id: 1, page: "1", text: "코멘트를 입력하세요..." },
  ]);

  const addComment = (page: string, text: string) => {
    const newComment = {
      id: Date.now(),
      page: page || "0",
      text: text,
    };
    setComments([...comments, newComment]);
  };

  const deleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  // 만약 선택된 책이 없을 때 보여줄 화면
  if (!book) {
    return (
      <main className="flex-1 flex items-center justify-center text-gray-400">
        사이드바에서 책을 검색하고 선택해주세요.
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col h-full">
      {/* 상단 정보 */}
      <header className="p-8 flex gap-6">
        {/* 실제 책 표지 이미지 적용 */}
        <div className="w-38 h-52 bg-[#d9d9d9] flex items-center justify-center overflow-hidden shadow-md">
          {book.thumbnail ? (
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">사진 없음</span>
          )}
        </div>

        <div className="flex-1">
          {/* 실제 제목과 저자 정보 적용 */}
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-gray-500 mt-1">
            {book.authors?.join(", ")} | 카카오 도서 정보
          </p>
        </div>
      </header>

      <CommentList
        comments={[...comments].sort((a, b) => Number(a.page) - Number(b.page))}
        onDelete={deleteComment}
      />

      <CommentInput onAdd={addComment} />
    </main>
  );
}
