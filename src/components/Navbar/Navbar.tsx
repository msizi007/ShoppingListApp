import { BsCart, BsPersonFill } from "react-icons/bs";
import styles from "./navbar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

interface Props {
  isLoggedIn: boolean;
}

export default function Navbar(props: Props) {
  const [showToolTip, setShowToolTip] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <FaShoppingCart size={25} />
        <h2 className={styles.title} onClick={() => navigate("/")}>
          Shopify
        </h2>
      </div>
      <div className={styles.right}>
        <button className={styles.button}>Privacy</button>
        {props.isLoggedIn ? (
          <>
            <span className={styles.icon}>
              <BsPersonFill
                size={30}
                onClick={() => setShowToolTip(!showToolTip)}
              />
              {showToolTip && (
                <div className={styles.tooltip}>
                  <button
                    className={styles.tooltipButton}
                    onClick={() => navigate("/profile")}
                  >
                    View Profile
                  </button>
                  <button className={styles.tooltipButton} onclick={() => {}}>
                    Log out
                  </button>
                </div>
              )}
            </span>
          </>
        ) : (
          <>
            <button
              className={styles.button}
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
