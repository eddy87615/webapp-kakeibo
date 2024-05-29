import React, { useEffect } from 'react';
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
        console.log('正在安装 Service worker');
      } else if (registration.waiting) {
        console.log('已安装 Service worker');
      } else if (registration.active) {
        console.log('啟動 Service worker');
      }
    } catch (error) {
      console.error(`註冊失敗：${error}`);
    }
  }
};

registerServiceWorker();

const InstallPromptButton = () => {
  useEffect(() => {
    let deferredPrompt;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;

      const installButton = document.getElementById('installButton');
      if (installButton) {
        installButton.style.display = 'block';
        installButton.addEventListener('click', async () => {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return (
    <button id="installButton" style={{ display: 'none' }}>
      Install App
    </button>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <InstallPromptButton />
  </React.StrictMode>
);
