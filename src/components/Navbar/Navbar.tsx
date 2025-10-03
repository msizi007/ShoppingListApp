import { BsPersonFill } from "react-icons/bs";
import styles from "./navbar.module.css";

interface Props {
  isLoggedIn: boolean;
}

export default function Navbar(props: Props) {
  return (
    <div className={styles.navbar}>
      <h2 className={styles.title}>Shopify</h2>
      <div className={styles.right}>
        <button className={styles.button}>Home</button>
        <button className={styles.button}>Privacy</button>
        {props.isLoggedIn ? (
          <>
            <span className={styles.icon}>
              <BsPersonFill size={30} />
            </span>
          </>
        ) : (
          <>
            <button className={styles.button}>Log in</button>
            <button className={styles.button}>Sign up</button>
          </>
        )}
      </div>
    </div>
  );
}
