import { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setIsVisible(false);
    } else {
      console.log('Deferred prompt not available');
    }
  };

  return (
    isVisible && (
      <button
        onClick={handleInstallClick}
        style={{ position: 'fixed', bottom: 0, right: 0, margin: '1rem' }}
      >
        安裝應用程式
      </button>
    )
  );
};

export default InstallPrompt;
