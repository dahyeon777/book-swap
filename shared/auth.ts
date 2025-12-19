// shared/auth.ts
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "./firebase";

// 회원가입 (이메일, 비번, 이름)
export const signUpEmail = async (email: string, pass: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  // 회원가입 직후 사용자 프로필에 이름 업데이트
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
};

// 로그인
export const loginEmail = async (email: string, pass: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
};

// 로그아웃
export const logout = () => signOut(auth);