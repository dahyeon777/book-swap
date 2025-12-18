"use client";

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
    <section className="flex-1 bg-[#e8f8fa] border-t border-b overflow-y-auto p-4 space-y-2">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white/60 p-3 rounded shadow-sm flex justify-between items-center group"
        >
          <div className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm min-w-[30px]">
              {comment.page}p
            </span>
            <span className="text-gray-800 text-sm">{comment.text}</span>
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
