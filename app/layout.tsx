// 만든 Header 컴포넌트 임포트
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        
        <main>{children}</main>
      </body>
    </html>
  );
}
