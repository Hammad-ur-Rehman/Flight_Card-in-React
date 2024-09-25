import React from "react";
import { Oval } from "react-loader-spinner";
import styles from "./loading.module.css";

const Loading: React.FC = () => {
  return (
    <>
    <div className={styles.spinner}>
      <div className={styles.loading}>
        <Oval/>
      </div>
      </div>
      {/* 
      <div className="loader">
          Loading...
      </div>
      */}
    </>
  );
};

export default Loading;