// API 요청/응답 타입 정의

// 공통 타입
export type KoreanLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

// 퀴즈 제출
export interface QuizSubmitRequest {
  totalCount: number;
  correctCount: number;
  elapsedMillis: number;
}

export interface QuizSubmitResponse {
  quizSetId: number;
  totalCount: number;
  correctCount: number;
  accuracy: number;
  elapsedMillis: number;
}

// AI 퀴즈 생성
export interface QuizSetGenerateRequest {
  title: string;
  level: string;
  count: number;
}

export interface QuizSetGenerateResponse {
  quizSetId: number;
  title: string;
  count: number;
}

// 내 정보
export interface MyInfoRequest {
  name: string;
  koreanLevel: string;
}

export interface MyInfoResponse {
  id: number;
  name: string;
  koreanLevel: KoreanLevel;
  solvedQuizCount: number;
}

// 퀴즈 세트 목록
export interface QuizSetListResponse {
  id: number;
  title: string;
  level: KoreanLevel;
  quizCount: number;
  solved: boolean;
}

// 퀴즈 상세 정보
export interface QuizInSetResponse {
  id: number;
  type: string;
  question: string;
  answer: string;
  choices: string;
}

export interface QuizSetDetailResponse {
  id: number;
  title: string;
  level: KoreanLevel;
  quizzes: QuizInSetResponse[];
}

// 내 브리핑
export interface MyBriefingResponse {
  briefing: string;
}
