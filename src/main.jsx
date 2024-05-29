import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//service worker register
const registerServiceWorker = async () => {
  if ('serviceworker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/serviceworker.js',
        {
          scope: './main.jsx',
        }
      );
      if (registration.installing) {
        console.log('正在安装 Service worker');
      } else if (registration.waiting) {
        console.log('已安装 Service worker installed');
      } else if (registration.active) {
        console.log('啟動 Service worker');
      }
    } catch (error) {
      console.error(`註冊失敗：${error}`);
    }
  }
};

navigator.serviceWorker.register('/serviceworker.js').then(
  (registration) => {
    console.log(
      'ServiceWorker registration successful with scope: ',
      registration.scope
    );
  },
  (err) => {
    console.log('ServiceWorker registration failed: ', err);
  }
);
registerServiceWorker();

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // 防止自動顯示安裝提示
  e.preventDefault();
  deferredPrompt = e;

  // 在你認為合適的時候顯示提示
  document.getElementById('installButton').addEventListener('click', (e) => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
