import styles from "./popup.module.css";

interface Props {
  type: string;
  text: string;
}

export default function Popup(props: Props) {
  return (
    <div className={`${styles.popup} ${styles[props.type]}`}>{props.text}</div>
  );
}
