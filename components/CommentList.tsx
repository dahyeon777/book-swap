"use client";
import backImg from "../public/img/6.png.jpg";

interface Comment {
  id: number;
  page: string;
  text: string;
}

// 1. onDelete의 타입을 정의해줍니다.
export default function CommentList({
  comments,
  onDelete,
}: {
  comments: Comment[];
  onDelete: (id: number) => void;
}) {
  return (
    <section
      className="flex-1 border-t border-b overflow-y-auto p-4 space-y-2 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backImg.src})` }}
    >
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white/70 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-sm flex justify-between items-start group"
        >
          <div className="flex gap-4 items-start">
            <span className="text-blue-600 font-extrabold text-base min-w-[45px] pt-0.5">
              {comment.page}p
            </span>
            <span className="text-gray-900 text-base font-medium leading-relaxed whitespace-pre-wrap">
              {comment.text}
            </span>
          </div>
          {/* 2. 삭제 버튼 추가 */}
          <button
            onClick={() => onDelete(comment.id)}
            className="text-xs text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity px-2"
          >
            삭제
          </button>
        </div>
      ))}
    </section>
  );
}
