import { FC } from "react";
import styles from "./{{name}}.module.scss";

export interface {{name}}Props {
  className?: string;
}

export const {{name}}: FC<{{name}}Props> = ({ className }) => {
  return (
    <div className={styles.root}>
      {{name}} page
    </div>
  );
};
