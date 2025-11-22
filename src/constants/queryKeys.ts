export const QUERY_KEYS = {
  MY_INFO: 'myInfo',
  MY_BRIEFING: 'myBriefing',

  QUIZ_SET_LIST: 'quizSetList',
  QUIZ_SET_DETAIL: (id: number) => ['quizSetDetail', id],
} as const;
