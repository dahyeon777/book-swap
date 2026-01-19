# 📚 BOOK-SWAP
> **Next.js 14 & Firebase 기반의 고성능 독서 기록 관리 플랫폼**

[서비스 바로가기](https://book-swap-livid.vercel.app/)


![Image](https://github.com/user-attachments/assets/0fff60aa-4348-4e07-a854-be063aabec01)


---

## 🚀 핵심 기술 구현 (Key Technical Features)

### ⚡ 성능 및 사용자 경험(UX) 최적화
- **Optimistic UI 적용**: 코멘트 등록 시 Firebase 응답을 기다리지 않고 UI를 즉시 업데이트하여, 네트워크 지연 없이 즉각적인 사용자 피드백을 제공합니다.
- **실시간 유효성 검사**: `useEffect`를 활용해 이메일 형식과 비밀번호 길이를 실시간으로 체크하여 사용자에게 시각적 피드백을 즉시 제공합니다.
- **가독성 높은 타임라인**: `sort()` 함수를 사용하여 기록된 코멘트를 페이지(p) 순으로 자동 정렬함으로써 독서 흐름에 맞는 리스트를 구성했습니다.

### 🏗 효율적인 데이터 및 상태 관리
- **Firestore 다이나믹 키 설계**: `book.isbn`을 Key로 활용하는 중첩 객체 구조를 설계하여, 유저 문서 하나에서 여러 도서의 코멘트를 효율적으로 관리하고 쿼리 비용을 최적화했습니다.
- **OAuth & Auth Persistence**: Firebase의 `onAuthStateChanged`를 통해 새로고침 후에도 로그인 상태가 안정적으로 유지되도록 구현했습니다.
- **실시간 API 데이터 바인딩**: 카카오 도서 API를 연동하여 검색 결과에서 선택된 도서 정보를 실시간으로 라이브러리 목록에 반영합니다.

---

## 🛠 Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Backend/DB**: Firebase (Firestore, Authentication)
- **Styling**: Tailwind CSS
- **API**: Kakao Books API

---

## 🔥 트러블슈팅 및 성장 포인트

### 1. 중첩 객체 구조를 통한 데이터 효율화
- **문제**: 도서마다 개별 문서를 생성할 경우 Firestore 읽기/쓰기 횟수가 과다하게 발생하는 구조적 문제 예상.
- **해결**: 유저 문서 내에 `books` 객체를 만들고 `ISBN`을 다이나믹 키로 사용하여 코멘트를 저장하는 방식으로 구조를 변경했습니다.
- **결과**: 데이터 구조가 단순해졌으며, 한 번의 쿼리로 유저의 모든 독서 기록을 효율적으로 불러올 수 있게 되었습니다.



### 2. 사용자 체감 속도 개선 (Optimistic UI)
- **문제**: Firebase 통신 환경에 따라 코멘트 등록 시 약 0.5~1초의 딜레이 발생.
- **해결**: 클라이언트 상태를 먼저 업데이트하고 서버 통신 결과에 따라 상태를 동기화하는 '낙관적 업데이트' 패턴을 도입했습니다.
- **결과**: 사용자가 느끼는 인터렉션 속도를 비약적으로 향상시켰습니다.


