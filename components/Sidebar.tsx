"use client";
import { useState, useEffect } from "react";
import SidebarSearch from "./SidebarSearch";
import SidebarList from "./SidebarList";
import { db, auth } from "@/shared/firebase"; // 경로는 프로젝트에 맞게 확인해주세요.
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
  onSelectBookForMain: (book: Book) => void; // 메인 화면에 책 정보를 띄우기 위한 함수
}

export default function Sidebar({ onSelectBookForMain }: SidebarProps) {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [myBooks, setMyBooks] = useState<Book[]>([]); // 내 서재 목록
  const [user, setUser] = useState<any>(null);

  // 1. 초기 로드: 로그인 상태 확인 및 기존 저장된 책 목록 불러오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          // 파이어베이스에 저장된 bookList를 가져와 상태에 반영
          setMyBooks(userDoc.data().bookList || []);
        }
      } else {
        setUser(null);
        setMyBooks([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. 검색 로직 (카카오 API 호출)
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

  // 3. 책 선택 시 핵심 로직
  const handleSelectBook = async (book: Book) => {
    // [A] 우측 메인 화면에 책 상세 정보 표시 (기존 기능 복구)
    onSelectBookForMain(book);

    // [B] 내 리스트에 추가 및 DB 저장
    if (!user) {
      console.warn("로그인하지 않은 사용자입니다. 리스트에만 임시 추가합니다.");
    }

    // 중복 체크 (이미 내 목록에 있는 책인지 확인)
    const isAlreadyAdded = myBooks.some((b) => b.isbn === book.isbn);

    if (!isAlreadyAdded) {
      // 1. UI 상태 업데이트
      const updatedList = [...myBooks, book];
      setMyBooks(updatedList);

      // 2. 파이어베이스 저장
      if (user) {
        const userRef = doc(db, "users", user.uid);
        try {
          await updateDoc(userRef, {
            bookList: arrayUnion(book),
          });
        } catch (error: any) {
          // 유저 문서가 아예 없는 경우 새로 생성
          await setDoc(userRef, { bookList: [book] }, { merge: true });
        }
      }
    }

    // 검색 결과창 닫기
    setSearchResults([]);
  };

  return (
    <aside className="w-80 bg-[#ededed] flex flex-col border-r h-full relative">
      <SidebarSearch
        onSearch={handleSearch}
        onFocus={() => {}}
        onBlur={() => setTimeout(() => setSearchResults([]), 200)}
      />

      {/* 검색 결과 레이어 (Floating 결과창) */}
      {searchResults.length > 0 && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-2xl z-[100] border-b border-x max-h-[400px] overflow-y-auto">
          <p className="p-2 text-[10px] font-bold text-gray-400 bg-gray-50 border-b">
            도서 검색 결과
          </p>
          {searchResults.map((book) => (
            <div
              key={book.isbn}
              className="p-3 hover:bg-blue-50 cursor-pointer flex gap-3 border-b border-gray-100 last:border-none"
              onClick={() => handleSelectBook(book)}
            >
              {book.thumbnail && (
                <img
                  src={book.thumbnail}
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

      {/* 최종 도서 목록 (SidebarList) */}
      <SidebarList books={myBooks} onSelectBook={onSelectBookForMain} />
    </aside>
  );
}
