import { useEffect, ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modals");

interface ModalProps {
  title?: string;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title = "", onClose, children }) => {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    onClose();
  };

  useEffect(() => {
    const closeByEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      onClose();
    };

    const handleKeyDown = (e: Event) => closeByEscape(e as KeyboardEvent);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.main}>
      <div className={`${styles.modal} p-5 pb-10`}>
        <div className={styles.title_icon_wrap}>
          <h3 className="text text_type_main-large mr-4">{title}</h3>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlay onClick={handleOverlayClick} />
    </div>,
    modalRoot
  );
};

export default Modal;
