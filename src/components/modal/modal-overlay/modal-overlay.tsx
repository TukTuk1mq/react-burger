import React, { MouseEventHandler } from "react";
import styles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  onClick: MouseEventHandler<HTMLDivElement>;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
