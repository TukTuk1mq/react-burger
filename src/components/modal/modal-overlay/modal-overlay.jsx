import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";
export default function ModalOverlay({ onClick }) {
  return <div className={styles.overlay} onClick={onClick}></div>;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
