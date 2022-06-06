import React from "react";
import AccessControl from "../../features/access-control/AccessControl";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <AccessControl></AccessControl>
    </div>
  );
}
