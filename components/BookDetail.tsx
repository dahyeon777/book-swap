"use client";

import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useState, useEffect } from "react";
import { Book } from "./Sidebar";
import { db, auth } from "@/shared/firebase"; // 파이어베이스 불러오기
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface BookDetailProps {
  book: Book | null;
}

export default function BookDetail({ book }: BookDetailProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  // 1. 로그인 유저 상태 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. 책이 바뀌거나 유저가 바뀌면 해당 책의 코멘트 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      if (user && book) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const allComments = userDoc.data().comments || {};
          // 현재 보고 있는 책의 ISBN을 키로 사용하여 코멘트 배열 가져오기
          setComments(allComments[book.isbn] || []);
        } else {
          setComments([]);
        }
      }
    };
    fetchComments();
  }, [book, user]);

  // 3. 코멘트 추가 및 파이어베이스 저장
  const addComment = async (page: string, text: string) => {
    if (!user || !book) {
      alert("로그인이 필요하거나 선택된 책이 없습니다.");
      return;
    }

    const newComment = {
      id: Date.now(),
      page: page || "0",
      text: text,
      createdAt: new Date().toISOString(),
    };

    // UI 먼저 업데이트 (빠른 반응 속도)
    setComments((prev) => [...prev, newComment]);

    // 파이어베이스 저장 로직
    const userRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userRef, {
        // 다이나믹 키를 사용하여 comments 객체 내부의 특정 ISBN 배열에 추가
        [`comments.${book.isbn}`]: arrayUnion(newComment),
      });
    } catch (error) {
      // 문서가 없거나 필드가 없을 경우 초기 세팅
      await setDoc(userRef, {
        comments: {
          [book.isbn]: [newComment],
        },
      }, { merge: true });
    }
  };

  // 4. 코멘트 삭제 (DB에서도 삭제)
  const deleteComment = async (id: number) => {
    if (!user || !book) return;

    const updatedComments = comments.filter((c) => c.id !== id);
    setComments(updatedComments);

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      [`comments.${book.isbn}`]: updatedComments,
    });
  };

  if (!book) {
    return (
      <main className="flex-1 flex items-center justify-center text-gray-400">
        사이드바에서 책을 검색하고 선택해주세요.
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col h-full bg-white">
      <header className="p-8 flex gap-6 border-b">
        <div className="w-38 h-52 bg-[#d9d9d9] flex items-center justify-center overflow-hidden shadow-md rounded">
          {book.thumbnail ? (
            <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500">사진 없음</span>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-gray-500 mt-1">
            {book.authors?.join(", ")} | 카카오 도서 정보
          </p>
        </div>
      </header>

      {/* 페이지 순으로 정렬하여 보여주기 */}
      <CommentList
        comments={[...comments].sort((a, b) => Number(a.page) - Number(b.page))}
        onDelete={deleteComment}
      />

      <CommentInput onAdd={addComment} />
    </main>
  );
}