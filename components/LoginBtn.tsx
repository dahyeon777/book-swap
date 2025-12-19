"use client";

import { useState, useEffect } from "react";
import { loginEmail, logout, signUpEmail } from "@/shared/auth";
import { auth } from "@/shared/firebase";
import { User } from "firebase/auth";

export default function LoginBtn() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false); // 회원가입 모드인지 확인

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await signUpEmail(email, password, "사용자"); // 기본 이름 설정
        alert("회원가입 성공!");
      } else {
        await loginEmail(email, password);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          {user.displayName || user.email}님
        </span>
        <button
          onClick={logout}
          className="text-xs bg-gray-200 px-2 py-1 rounded"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 border p-4 rounded-lg bg-white shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="이메일"
          className="border p-1 text-sm"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="border p-1 text-sm"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-1 rounded text-sm"
        >
          {isRegister ? "회원가입" : "로그인"}
        </button>
      </form>
      <button
        onClick={() => setIsRegister(!isRegister)}
        className="text-[10px] text-gray-500 underline"
      >
        {isRegister ? "이미 계정이 있나요? 로그인" : "계정이 없나요? 회원가입"}
      </button>
    </div>
  );
}
