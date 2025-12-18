"use client";
import { useState } from "react";
import SidebarSearch from "./SidebarSearch";
import SidebarList from "./SidebarList";

export interface Book {
  title: string;
  isbn: string;
  authors: string[];
  thumbnail: string;
}

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState<Book[]>([]); // 검색 결과 5개
  const [isFocused, setIsFocused] = useState(false); // 검색창 포커스 여부

  // Sidebar.tsx 내 검색 함수 부분
  const handleSearch = async (query: string) => {
  if (!query.trim()) {
    setSearchResults([]);
    return;
  }

  try {
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("네트워크 응답 에러");

    const data = await res.json();
    console.log("검색 결과 데이터:", data); // 전체 응답 확인
    
    // 카카오 API는 documents 배열로 반환
    const books = data.documents || [];
    console.log("변환된 책 목록:", books); // 책 목록 확인
    
    setSearchResults(books);
  } catch (err) {
    console.error("검색 중 오류 발생:", err);
    setSearchResults([]);
  }
};

  // Sidebar.tsx 수정 부분

  return (
    <aside className="w-64 bg-[#ededed] flex flex-col border-r h-full relative">
      <SidebarSearch
        onSearch={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />

      {/* 🔴 수정한 부분: isFocused 조건을 빼고 우선 결과가 있으면 보이게 합니다 */}
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
                console.log("선택!", book);
                // 여기에 나중에 내 목록에 추가하는 함수를 넣을 거예요
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
