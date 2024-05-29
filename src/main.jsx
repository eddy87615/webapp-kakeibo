import React, { useState, useEffect } from 'react';
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
  const [showButton, setShowButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // 保存事件以便稍后使用
      setShowButton(true); // 当事件触发时显示按钮
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
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowButton(false); // 用户做出选择后隐藏按钮
    }
  };

  return (
    <>
      {showButton && <button onClick={handleInstallClick}>Install App</button>}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <InstallPrompt />
  </React.StrictMode>
);
