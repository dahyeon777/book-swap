import Header from "@/components/Header"; // 만든 Header 컴포넌트 임포트
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {/* 1. 헤더를 body 최상단에 배치 */}
        <Header />

        {/* 2. 헤더 높이만큼(예: h-16 = 4rem) padding-top을 주어 컨텐츠가 가려지지 않게 함 */}
        <main>{children}</main>
      </body>
    </html>
  );
}
