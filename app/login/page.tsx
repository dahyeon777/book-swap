"use client";

import { useState } from "react";
import { loginEmail, signUpEmail } from "@/shared/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 1. 비밀번호 확인 상태 추가
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegister && password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      if (isRegister) {
        await signUpEmail(email, password, "사용자");
        alert("회원가입 성공!");
      } else {
        await loginEmail(email, password);
      }
      router.push("/");
    } catch (err: any) {
      // 파이어베이스 에러 코드에 따라 메시지 변환
      let errorMessage = "알 수 없는 에러가 발생했습니다.";

      switch (err.code) {
        case "auth/invalid-credential":
          errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
          break;
        case "auth/user-not-found":
          errorMessage = "가입되지 않은 이메일입니다.";
          break;
        case "auth/wrong-password":
          errorMessage = "비밀번호가 틀렸습니다.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "이미 사용 중인 이메일입니다.";
          break;
        case "auth/weak-password":
          errorMessage = "비밀번호는 6자리 이상이어야 합니다.";
          break;
        case "auth/network-request-failed":
          errorMessage = "네트워크 연결이 원활하지 않습니다.";
          break;
        case "auth/invalid-email":
          errorMessage = "유효하지 않은 이메일 형식입니다.";
          break;
      }

      alert(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "회원가입" : "로그인"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="이메일 주소"
            className="p-3 border rounded focus:outline-blue-500 text-black"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="p-3 border rounded focus:outline-blue-500 text-black"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* 3. 회원가입 모드일 때만 비밀번호 확인 필드 노출 */}
          {isRegister && (
            <input
              type="password"
              placeholder="비밀번호 확인"
              className={`p-3 border rounded focus:outline-blue-500 text-black ${
                confirmPassword && password !== confirmPassword
                  ? "border-red-500"
                  : ""
              }`}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          {/* 비밀번호 불일치 시 실시간 문구 표시 (선택 사항) */}
          {isRegister && confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-xs -mt-2 ml-1">
              비밀번호가 일치하지 않습니다.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 mt-2"
          >
            {isRegister ? "가입하기" : "로그인"}
          </button>
        </form>

        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setConfirmPassword(""); // 모드 전환 시 확인 필드 초기화
          }}
          className="w-full mt-4 text-sm text-gray-500 hover:underline"
        >
          {isRegister
            ? "이미 계정이 있나요? 로그인"
            : "계정이 없나요? 회원가입"}
        </button>
      </div>
    </div>
  );
}
