import { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [showButton, setShowButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt event fired'); // 调试信息
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    console.log('Event listener added for beforeinstallprompt');

    // 延迟三秒后显示下载按钮
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      clearTimeout(timer);
      console.log('Event listener removed for beforeinstallprompt');
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      console.log('Prompting install');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowButton(false);
    } else {
      // 手动触发安装提示
      alert(
        'To install the app, please use the browser\'s install option (e.g., "Add to Home screen" in Chrome menu).'
      );
    }
  };

  return (
    <>
      {showButton && <button onClick={handleInstallClick}>Install App</button>}
    </>
  );
};

export default InstallPrompt;
