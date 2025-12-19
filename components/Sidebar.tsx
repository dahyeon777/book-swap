"use client";
import { useState } from "react";
import SidebarSearch from "./SidebarSearch";
import SidebarList from "./SidebarList";

export interface Book {
  title: string;
  isbn: string;
  authors: string[];
  thumbnail: string;
  datetime?: string; // 날짜 정보도 있으면 좋으니 추가
}

// 1. Props 타입 정의: 부모로부터 선택 함수를 받습니다.
interface SidebarProps {
  onSelectBook: (book: Book) => void;
}

export default function Sidebar({ onSelectBook }: SidebarProps) {
  // 2. Props 받아오기
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("네트워크 응답 에러");

      const data = await res.json();
      const books = data.documents || [];
      setSearchResults(books);
    } catch (err) {
      console.error("검색 중 오류 발생:", err);
      setSearchResults([]);
    }
  };

  return (
    <aside className="w-80 bg-[#ededed] flex flex-col border-r h-full relative">
      <SidebarSearch
        onSearch={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />

      {searchResults.length > 0 && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-2xl z-[100] border-b border-x max-h-[400px] overflow-y-auto">
          <p className="p-2 text-[10px] font-bold text-gray-400 bg-gray-50">
            도서 검색 결과
          </p>
          {searchResults.map((book) => (
            <div
              key={book.isbn}
              className="p-3 hover:bg-blue-50 cursor-pointer flex gap-3 border-b border-gray-100 last:border-none group"
              onClick={() => {
                // 3. 클릭 시 실행: 부모에게 데이터 전달 + 검색창 닫기
                onSelectBook(book);
                setSearchResults([]);
              }}
            >
              {book.thumbnail && (
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-10 h-14 object-cover shadow-sm"
                />
              )}
              <div className="flex flex-col justify-center overflow-hidden">
                <p className="text-sm font-bold truncate group-hover:text-blue-600">
                  {book.title}
                </p>
                <p className="text-[10px] text-gray-500">
                  {book.authors?.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <SidebarList />
    </aside>
  );
}
