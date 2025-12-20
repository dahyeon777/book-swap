"use client";

import LoginBtn from "./LoginBtn";

export default function Header() {
  return (
    <header className="w-full h-16 border-b bg-white flex items-center justify-between px-8 shrink-0">
      <div className="font-bold text-xl text-blue-600 flex items-center gap-2 cursor-default select-none">
        <span>📚</span> BOOK-SWAP
      </div>

      <div>
        <LoginBtn />
      </div>
    </header>
  );
}
