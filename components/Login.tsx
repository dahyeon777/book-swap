"use client";

import { useState, useEffect } from "react";
import { auth } from "@/shared/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // --- 에러 메시지 상태 추가 ---
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // 1. 실시간 유효성 검사 (입력할 때마다 체크)
  useEffect(() => {
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }

    if (password && password.length < 6) {
      setPasswordError("비밀번호는 최소 6자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }

    if (isRegister && confirmPassword && password !== confirmPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmError("");
    }
  }, [email, password, confirmPassword, isRegister]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 에러가 하나라도 있으면 진행 안 함
    if (emailError || passwordError || (isRegister && confirmError)) return;

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.error(error.code);
      // 서버 에러를 해당 필드 메시지로 연결
      switch (error.code) {
        case "auth/email-already-in-use":
          setEmailError("이미 가입된 이메일입니다.");
          break;
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setPasswordError("이메일 또는 비밀번호가 틀렸습니다.");
          break;
        case "auth/too-many-requests":
          setPasswordError("너무 많은 시도입니다. 잠시 후 다시 하세요.");
          break;
        default:
          setEmailError("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/img/6.png.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 bg-white/80 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl border border-white/40 flex flex-col items-center max-w-md w-full mx-4 transition-all">
        <div className="text-5xl mb-4">📚</div>
        <h1 className="text-3xl font-black text-gray-800 mb-2 tracking-tight">
          BOOK-SWAP
        </h1>
        <p className="text-gray-600 mb-8 text-center font-medium">
          우리만의 교환 독서 기록장
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* 이메일 필드 */}
          <div className="space-y-1">
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-5 py-4 rounded-2xl border-2 outline-none transition-all placeholder:text-gray-400 bg-white/50 ${
                emailError
                  ? "border-red-400 focus:border-red-500"
                  : "border-transparent focus:ring-2 focus:ring-blue-400"
              }`}
              required
            />
            {emailError && (
              <p className="text-red-500 text-xs ml-2 font-bold animate-in fade-in slide-in-from-left-1">
                {emailError}
              </p>
            )}
          </div>

          {/* 비밀번호 필드 */}
          <div className="space-y-1">
            <input
              type="password"
              placeholder="비밀번호 (6자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-5 py-4 rounded-2xl border-2 outline-none transition-all placeholder:text-gray-400 bg-white/50 ${
                passwordError
                  ? "border-red-400 focus:border-red-500"
                  : "border-transparent focus:ring-2 focus:ring-blue-400"
              }`}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-xs ml-2 font-bold animate-in fade-in slide-in-from-left-1">
                {passwordError}
              </p>
            )}
          </div>

          {/* 비밀번호 확인 필드 */}
          {isRegister && (
            <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-5 py-4 rounded-2xl border-2 outline-none transition-all placeholder:text-gray-400 bg-white/50 ${
                  confirmError
                    ? "border-red-400 focus:border-red-500"
                    : "border-transparent focus:ring-2 focus:ring-blue-400"
                }`}
                required
              />
              {confirmError && (
                <p className="text-red-500 text-xs ml-2 font-bold animate-in fade-in slide-in-from-left-1">
                  {confirmError}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 mt-4"
          >
            {isRegister ? "계정 만들기" : "로그인하기"}
          </button>
        </form>

        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setConfirmPassword("");
            setEmailError("");
            setPasswordError("");
          }}
          className="mt-6 text-sm text-gray-600 hover:text-blue-600 transition-colors underline underline-offset-4 font-medium"
        >
          {isRegister
            ? "이미 계정이 있으신가요? 로그인"
            : "처음이신가요? 회원가입하기"}
        </button>
      </div>
    </div>
  );
}
