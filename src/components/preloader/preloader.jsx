import React from "react";
import styles from "./preloader.module.css";

function Preloader() {
  return (
    <div
      style={{ textAlign: "center", marginTop: "100px" }}
      className={styles.mainLoad}
    >
      <p className="text text_type_main-medium">Загрузка пользователя...</p>
    </div>
  );
}

export default Preloader;
