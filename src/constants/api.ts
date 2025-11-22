// API 관련 상수

export const API_BASE_URL = 'http://3.145.41.193:8080';

export const API_ENDPOINTS = {
  QUIZ_SETS: '/api/quiz-sets',
  QUIZ_SET_DETAIL: (id: number) => `/api/quiz-sets/${id}`,
  QUIZ_SET_SUBMIT: (id: number) => `/api/quiz-sets/${id}/submit`,
  MY_INFO: '/api/me',
  MY_BRIEFING: '/api/me/briefing',
} as const;

export const KOREAN_LEVELS = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
} as const;

export const KOREAN_LEVEL_LABELS: Record<string, string> = {
  BEGINNER: '초급',
  INTERMEDIATE: '중급',
  ADVANCED: '고급',
};
