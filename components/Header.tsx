"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "@/shared/firebase";
import { logout } from "@/shared/auth";
import { User } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <header className="w-full h-16 border-b bg-white flex items-center justify-between px-8">
      <Link href="/" className="font-bold text-xl text-blue-600">
        📚 BOOK-SWAP
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">{user.email}님</span>
            <button
              onClick={logout}
              className="px-4 py-2 border rounded text-sm hover:bg-gray-50"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            로그인 / 회원가입
          </Link>
        )}
      </div>
    </header>
  );
}
