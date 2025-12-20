import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");


  const apiKey =
    process.env.KAKAO_REST_API_KEY || "c94c3139fd8cfd6a4844b387a5d2bab0";
  //   const apiKey = process.env.KAKAO_REST_API_KEY;
  console.log("API 키 존재 여부:", !!apiKey);
  console.log("API 키 앞 4자리:", apiKey?.substring(0, 4));

  if (!query) {
    return NextResponse.json({ documents: [] });
  }

  const KAKAO_API_URL = `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
    query
  )}&size=5`;

  try {
    const res = await fetch(KAKAO_API_URL, {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
    });

    console.log("카카오 API 응답 상태:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("카카오 API 에러 상세:", errorText);
      return NextResponse.json(
        { error: "API 호출 실패" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("카카오 호출 중 에러:", error);
    return NextResponse.json({ error: "카카오 연결 실패" }, { status: 500 });
  }
}
