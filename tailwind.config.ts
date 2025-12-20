import type { Config } from "tailwindcss";

const config: Config = {
  // 핵심: tailwind가 디자인을 "깎아먹지" 못하게 모든 경로를 명시합니다.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Component 폴더 누락 방지!
    "./shared/**/*.{js,ts,jsx,tsx,mdx}", // Firebase 설정 등 폴더
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // 혹시 모를 src 폴더
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
