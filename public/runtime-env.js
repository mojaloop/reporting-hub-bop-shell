// https://medium.com/@hasniarif/how-to-handle-runtime-environment-variables-with-react-ec809cb07831
window.shellEnv = {
  REMOTE_1_URL: '__REMOTE_1_URL__',
  REMOTE_2_URL: '__REMOTE_2_URL__',
  REMOTE_3_URL: '__REMOTE_3_URL__',
  REMOTE_4_URL: '__REMOTE_4_URL__',
  REACT_APP_TITLE: '__REACT_APP_TITLE__',
  REACT_APP_SUBTITLE:'__REACT_APP_SUBTITLE__',
  REACT_APP_SCSS:'__REACT_APP_SCSS__',
  REACT_APP_DFSP_IMG:'__REACT_APP_DFSP_IMG__',
  TEST_TEXT: '__TEST_TEXT__',
};
// console.log('KA code',REACT_APP_SCSS);
console.log('App Title:', window.shellEnv.REACT_APP_TITLE);