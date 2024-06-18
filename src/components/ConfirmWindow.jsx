/* eslint-disable react/prop-types */
import './ConfirmWindow.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmWindow({
  isOpen,
  onClose,
  onConfirm,
  confirmText,
}) {
  const bgshow = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { delay: 0.3, duration: 0.3 } },
  };
  const modalshow = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.3, duration: 0.3 },
    },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
  };
  return (
    <AnimatePresence
      onExitComplete={() => console.log('Exit animations are completed')}
    >
      {isOpen && (
        <motion.div
          className="confirmbg"
          variants={bgshow}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className="confirmwindow"
            variants={modalshow}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2>{confirmText}</h2>
            <div className="confirmbtnarea">
              <button onClick={onClose}>戻る</button>
              <button onClick={onConfirm}>削除</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
