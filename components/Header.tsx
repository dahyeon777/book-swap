"use client";

import Link from "next/link";
// 우리가 만든 UserInfo 컴포넌트를 가져옵니다.
import LoginBtn from "./LoginBtn";

export default function Header() {
  // 여기서 자체적으로 하던 유저 상태 체크나 logout 로직은
  // 이제 UserInfo가 담당하니까 다 지워버려도 됩니다! 깊생 결과 이게 제일 깔끔해요.

  return (
    <header className="w-full h-16 border-b bg-white flex items-center justify-between px-8 shrink-0">
      <Link
        href="/"
        className="font-bold text-xl text-blue-600 flex items-center gap-2"
      >
        <span>📚</span> BOOK-SWAP
      </Link>

      {/* 오른쪽 영역: UserInfo가 로그인 여부에 따라 '로그아웃'이나 '빈 칸'을 알아서 보여줍니다 */}
      <div>
        <LoginBtn />
      </div>
    </header>
  );
}
