"use client";

import { useState, useEffect } from "react";
import { logout } from "@/shared/auth";
import { auth } from "@/shared/firebase";
import { User } from "firebase/auth";

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // 로그아웃 확인 로직 추가
  const handleLogout = async () => {
    const isConfirm = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirm) {
      await logout();
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      {/* user.email이 있으면 이메일 앞부분을 보여주고, 없으면 displayName을 보여줍니다. */}
      <span className="text-sm font-semibold text-gray-700">
        {user.email ? user.email.split("@")[0] : user.displayName || "사용자"}님
        환영합니다!
      </span>

      {/* 확인 창을 거치는 로그아웃 버튼 */}
      <button
        onClick={handleLogout}
        className="text-xs font-bold text-gray-500 hover:text-red-500 bg-gray-100 hover:bg-red-50 px-3 py-1.5 rounded-full transition-all"
      >
        로그아웃
      </button>
    </div>
  );
}
