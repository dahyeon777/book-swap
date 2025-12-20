"use client";
import { useState, useEffect } from "react";
import SidebarSearch from "./SidebarSearch";
import SidebarList from "./SidebarList";
import { db, auth } from "@/shared/firebase";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export interface Book {
  title: string;
  isbn: string;
  authors: string[];
  thumbnail: string;
  datetime?: string;
}

interface SidebarProps {
  onSelectBookForMain: (book: Book) => void;
}

export default function Sidebar({ onSelectBookForMain }: SidebarProps) {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<any>(null);

  // 키보드 네비게이션을 위한 상태
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setMyBooks(userDoc.data().bookList || []);
        }
      } else {
        setUser(null);
        setMyBooks([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // 검색 결과가 바뀔 때마다 포커스 인덱스 초기화
  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchResults]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSearchResults(data.documents || []);
    } catch (err) {
      console.error("검색 중 오류:", err);
    }
  };

  const handleSelectBook = async (book: Book) => {
    onSelectBookForMain(book);

    if (!user) {
      console.warn("로그인하지 않은 사용자입니다.");
    }

    const isAlreadyAdded = myBooks.some((b) => b.isbn === book.isbn);

    if (!isAlreadyAdded) {
      const updatedList = [...myBooks, book];
      setMyBooks(updatedList);

      if (user) {
        const userRef = doc(db, "users", user.uid);
        try {
          await updateDoc(userRef, {
            bookList: arrayUnion(book),
          });
        } catch (error: any) {
          await setDoc(userRef, { bookList: [book] }, { merge: true });
        }
      }
    }
    setSearchResults([]);
    setFocusedIndex(-1);
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < searchResults.length) {
        handleSelectBook(searchResults[focusedIndex]);
      }
    } else if (e.key === "Escape") {
      setSearchResults([]);
    }
  };

  return (
    <aside
      className="w-80 bg-[#ededed] flex flex-col border-r h-full relative"
      onKeyDown={handleKeyDown} // 키보드 이벤트 감지
    >
      <SidebarSearch
        onSearch={handleSearch}
        onFocus={() => {}}
        // blur 시 바로 닫히면 클릭이 안 되므로 유지, ESC나 선택 시 닫히도록 로직 강화
        onBlur={() => setTimeout(() => setSearchResults([]), 200)}
      />

      {searchResults.length > 0 && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-2xl z-[100] border-b border-x max-h-[400px] overflow-y-auto">
          <p className="p-2 text-[10px] font-bold text-gray-400 bg-gray-50 border-b">
            도서 검색 결과 ({searchResults.length})
          </p>
          {searchResults.map((book, index) => (
            <div
              key={book.isbn}
              className={`p-3 cursor-pointer flex gap-3 border-b border-gray-100 last:border-none transition-colors ${
                focusedIndex === index ? "bg-blue-100" : "hover:bg-blue-50"
              }`}
              onClick={() => handleSelectBook(book)}
              onMouseEnter={() => setFocusedIndex(index)} // 마우스 호버 시에도 인덱스 동기화
            >
              {book.thumbnail && (
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-10 h-14 object-cover shadow-sm"
                />
              )}
              <div className="flex flex-col justify-center overflow-hidden">
                <p className="text-sm font-bold truncate">{book.title}</p>
                <p className="text-[10px] text-gray-500">
                  {book.authors?.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <SidebarList books={myBooks} onSelectBook={onSelectBookForMain} />
    </aside>
  );
}
