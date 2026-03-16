import { BsPersonFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../reduxHooks";
import { logout } from "../features/userSlice";

interface Props {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: Props) {
  const [showToolTip, setShowToolTip] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Helper to handle logout
  const handleLogout = () => {
    setShowToolTip(false);
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-3 shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Brand/Logo */}
        <div
          className="d-flex align-items-center gap-2"
          onClick={() => (isLoggedIn ? navigate("/home") : navigate("/"))}
          style={{ cursor: "pointer" }}
        >
          <FaShoppingCart size={28} className="text-primary" />
          <h4 className="mb-0 fw-bold text-white">Shopify</h4>
        </div>

        {/* Right side navigation */}
        <div className="d-flex align-items-center ms-auto">
          {!isLoggedIn ? (
            <div className="d-flex gap-2">
              <button
                className="btn btn-link text-light text-decoration-none px-3"
                onClick={() => navigate("/privacy")}
              >
                Privacy
              </button>
              <button
                className="btn btn-primary px-4 rounded-pill shadow-sm"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </div>
          ) : (
            <div className="position-relative">
              {/* Profile Icon */}
              <div
                className="bg-secondary rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "45px", height: "45px", cursor: "pointer" }}
                onClick={() => setShowToolTip((prev) => !prev)}
              >
                <BsPersonFill size={25} className="text-white" />
              </div>

              {/* Custom Dropdown Tooltip */}
              {showToolTip && (
                <>
                  {/* Invisible backdrop to close dropdown when clicking away */}
                  <div
                    className="position-fixed top-0 start-0 w-100 h-100"
                    style={{ zIndex: 1020 }}
                    onClick={() => setShowToolTip(false)}
                  ></div>

                  <div
                    className="position-absolute end-0 mt-2 bg-white border-0 rounded-3 shadow-lg p-2"
                    style={{ minWidth: "180px", zIndex: 1030 }}
                  >
                    <div className="px-3 py-2 border-bottom mb-2">
                      <small className="text-muted d-block">Account</small>
                      <span className="fw-bold">User Settings</span>
                    </div>
                    <button
                      className="btn btn-sm btn-light w-100 text-start mb-1 py-2"
                      onClick={() => {
                        setShowToolTip(false);
                        navigate("/profile");
                      }}
                    >
                      View Profile
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger w-100 text-start py-2"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
