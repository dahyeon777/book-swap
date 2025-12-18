"use client";

interface Comment {
  id: number;
  page: string;
  text: string;
}

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <section className="flex-1 bg-[#e8f8fa] border-t border-b overflow-y-auto p-4 space-y-2">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white/60 p-3 rounded shadow-sm flex gap-3 items-start"
        >
          <span className="text-blue-600 font-bold text-sm min-w-[30px]">
            {comment.page}p
          </span>
          <span className="text-gray-800 text-sm">{comment.text}</span>
        </div>
      ))}
    </section>
  );
}
