// // src/global.d.ts
declare global {
  interface Window {
    shellEnv: {
      REMOTE_1_URL: string;
      REMOTE_2_URL: string;
      REMOTE_3_URL: string;
      REMOTE_4_URL: string;
      REACT_APP_TITLE: string;
      TEST_TEXT: string;
    };
  }
}

export {};
