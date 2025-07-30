// https://medium.com/@hasniarif/how-to-handle-runtime-environment-variables-with-react-ec809cb07831

window.shellEnv = {}

fetch('/remotes.json')
  .then(response => response.json())
  .then(remotes => remotes.forEach(({baseUrl}, index) => window.shellEnv[`REMOTE_${index + 1}_URL`] = baseUrl))
  .catch(error => {
    console.error('Error loading remote URLs:', error);
  })
  .then(() => {
    Object.values(window.shellEnv).forEach(baseUrl => {
      const script = document.createElement('script');
      script.src = baseUrl + '/runtime-env.js';
      document.head.appendChild(script);
    });
  })
