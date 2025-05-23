import React from "react";
import styles from "./modal-overlay.module.css";
export default function ModalOverlay({ onClick }) {
  return <div className={styles.overlay} onClick={onClick}></div>;
}
