"use client";

import Sidebar from "@/components/Sidebar";
import BookDetail from "../components/BookDetail";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Login from "@/components/Login"; // 로그인 컴포넌트 임포트
import { auth } from "@/shared/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // 로그인 확인 중 로딩 상태

  // 유저 로그인 상태 감시
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // 상태 확인이 끝나면 로딩 해제
    });
    return () => unsubscribe();
  }, []);

  // 로딩 중일 때 잠깐 보여줄 화면 (선택 사항)
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        로딩 중...
      </div>
    );

  // 1. 로그인이 안 되어 있으면 로그인 페이지를 바로 보여줌
  if (!user) {
    return <Login />;
  }

  // 2. 로그인된 사용자에게만 기존의 메인 서비스 화면을 보여줌
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="shrink-0 border-b">
        <Header />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar onSelectBookForMain={setSelectedBook} />
        <BookDetail book={selectedBook} />
      </div>
    </div>
  );
}
