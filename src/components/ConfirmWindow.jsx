/* eslint-disable react/prop-types */
import './ConfirmWindow.css';

export default function ConfirmWindow({
  isOpen,
  onClose,
  onConfirm,
  confirmText,
}) {
  if (!isOpen) {
    return null;
  }

  console.log('Rendering ConfirmWindow with isOpen:', isOpen); // 添加日志信息

  return (
    <div className="confirmbg">
      <div className="confirmwindow">
        <h2>{confirmText}</h2>
        <div className="confirmbtnarea">
          <button onClick={onClose}>取消</button>
          <button onClick={onConfirm}>確認</button>
        </div>
      </div>
    </div>
  );
}
