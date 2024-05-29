import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/serviceworker.js',
        {
          scope: '/',
        }
      );
      if (registration.installing) {
        console.log('正在安裝 Service worker');
      } else if (registration.waiting) {
        console.log('已安裝 Service worker');
      } else if (registration.active) {
        console.log('啟動 Service worker');
      }
    } catch (error) {
      console.error(`註冊失敗：${error}`);
    }
  }
};

registerServiceWorker();

const InstallPrompt = () => {
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      // 使用用戶手勢觸發 prompt
      window.deferredPrompt = e;
      console.log('beforeinstallprompt Event fired');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = window.deferredPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      window.deferredPrompt = null;
    }
  };

  return <button onClick={handleInstallClick}>Install App</button>;
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <InstallPrompt />
  </React.StrictMode>
);
