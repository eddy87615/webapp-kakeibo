import { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt event fired'); // 调试信息
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    console.log('Event listener added for beforeinstallprompt');

    // 模拟用户交互
    setTimeout(() => {
      const event = new Event('click');
      document.body.dispatchEvent(event);
    }, 1000);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      console.log('Prompting install');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowButton(false); // 隐藏按钮以避免重复点击
    } else {
      alert(
        'To install the app, please use the browser\'s install option (e.g., "Add to Home screen" in the Chrome menu).'
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
