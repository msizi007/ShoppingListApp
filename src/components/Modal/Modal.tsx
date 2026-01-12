import { type ReactNode } from "react";
import styles from "./modal.module.css";

interface Props {
  children: ReactNode;
  isOpened: boolean;
}

export default function Modal(props: Props) {
  return (
    <>
      {props.isOpened && (
        <div className={styles.modal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
          >
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
