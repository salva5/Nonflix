import React from 'react'
import styles from "./BackButton.module.css"

function BackButton() {

    const goBack = () => {
        window.history.back();
      };

  return (
    <button className={styles.backButton} onClick={goBack}>
        <span className={styles.backArrow} aria-hidden="true"></span> Back

    </button>
  )
}

export default BackButton