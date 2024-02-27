import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../Modal/Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

export default function Modal({ open, children, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && open) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div>
      <div onClick={onClose}>
        <ModalOverlay />
      </div>
      <div className={styles.modal}>
        <button className={styles.CloseIcon} onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
