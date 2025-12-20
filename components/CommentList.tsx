"use client";
import backImg from "../public/img/6.png.jpg";

interface Comment {
  id: number;
  page: string;
  text: string;
}

export default function CommentList({
  comments,
  onDelete,
}: {
  comments: Comment[];
  onDelete: (id: number) => void;
}) {
  return (
    <section
      className="flex-1 border-t border-b overflow-y-auto bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backImg.src})` }}
    >
      {/* max-w-none으로 폭 제한을 풀고 px-6으로 양옆 마진을 넉넉히 줍니다 */}
      <div className="w-full max-w-[1400px] mx-auto space-y-3 px-6 py-8">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white/60 backdrop-blur-sm border border-white/40 px-6 py-4 rounded-lg shadow-sm flex justify-between items-start group transition-all hover:bg-white/80"
          >
            <div className="flex gap-5 items-start flex-1">
              {/* 페이지 번호 디자인을 조금 더 시원하게 키웠습니다 */}
              <span className="text-blue-500 font-bold text-xs bg-blue-50 px-3 py-1 rounded-full min-w-[48px] text-center mt-1 shadow-sm border border-blue-100/50">
                {comment.page}p
              </span>
              {/* flex-1로 텍스트가 가로 공간을 넓게 쓰게 합니다 */}
              <span className="text-gray-800 text-[15px] font-normal leading-relaxed whitespace-pre-wrap pt-0.5 flex-1">
                {comment.text}
              </span>
            </div>

            <button
              onClick={() => onDelete(comment.id)}
              className="text-[11px] text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-6 mt-1.5"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
