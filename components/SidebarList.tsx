// SidebarList.tsx
import { Book } from "./Sidebar";

interface SidebarListProps {
  books: Book[];
  onSelectBook: (book: Book) => void; // 리스트에 있는 책을 눌렀을 때도 메인에 떠야 하므로 추가
}

export default function SidebarList({ books, onSelectBook }: SidebarListProps) {
  return (
    <nav className="flex-1 overflow-y-auto">
      {books.length === 0 ? (
        <div className="p-10 text-center text-gray-400 text-sm">
          목록이 비어있습니다.
        </div>
      ) : (
        books.map((book) => (
          <div
            key={book.isbn}
            className="p-4 hover:bg-white cursor-pointer border-b border-gray-200 flex items-center gap-3 transition-all"
            onClick={() => onSelectBook(book)} // 리스트의 책 클릭 시 메인 화면 갱신
          >
            {book.thumbnail && (
              <img
                src={book.thumbnail}
                className="w-8 h-10 object-cover shadow-sm"
              />
            )}
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-bold text-gray-800">
                {book.title}
              </span>
              <span className="text-[10px] text-gray-500 truncate">
                {book.authors?.join(", ")}
              </span>
            </div>
          </div>
        ))
      )}
    </nav>
  );
}
