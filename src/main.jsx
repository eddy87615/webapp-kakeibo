// src/main.jsx
import React from 'react';
import { useState, useEffect } from 'react';
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
        console.log('已激活 Service worker');
      }
    } catch (error) {
      console.error(`注册失败：${error}`);
    }
  }
};

registerServiceWorker();

const InstallPrompt = () => {
  const [showButton, setShowButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt event fired', e); // 调试信息
      e.preventDefault(); // 阻止默认事件，允许你稍后触发
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  if (!showButton) {
    console.log('Install button not available'); // 如果按钮不可用，输出日志
  }

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowButton(false);
    }
  };

  return (
    <>
      {showButton && <button onClick={handleInstallClick}>Install App</button>}
      {!showButton && <p>Install prompt not available</p>}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <InstallPrompt />
  </React.StrictMode>
);
