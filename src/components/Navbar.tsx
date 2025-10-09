import { BsPersonFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../reduxHooks";
import { logoutUser } from "../features/loginSlice";

interface Props {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: Props) {
  const [showToolTip, setShowToolTip] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary px-3 py-3 shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <div
          className="d-flex align-items-center gap-2 cursor-pointer"
          onClick={() => (isLoggedIn ? navigate("/home") : navigate("/"))}
          style={{ cursor: "pointer" }}
        >
          <FaShoppingCart size={30} />
          <h4 className="mb-0">Shopify</h4>
        </div>

        {/* Right side */}
        <div className="d-flex align-items-center ms-auto position-relative">
          <button
            className="btn btn-outline-light me-3"
            onClick={() => navigate("/privacy")}
          >
            Privacy
          </button>

          {isLoggedIn ? (
            <div className="position-relative">
              <BsPersonFill
                size={40}
                style={{ cursor: "pointer" }}
                onClick={() => setShowToolTip((prev) => !prev)}
              />
              {showToolTip && (
                <div
                  className="position-absolute end-0 mt-2 bg-white border rounded shadow-sm p-2 z-3"
                  style={{ minWidth: "150px" }}
                >
                  <button
                    className="btn btn-sm btn-secondary w-100 mb-2"
                    onClick={() => {
                      setShowToolTip(false);
                      navigate("/profile");
                    }}
                  >
                    View Profile
                  </button>
                  <button
                    className="btn btn-sm btn-secondary w-100"
                    onClick={() => {
                      dispatch(logoutUser());
                      navigate("/");
                    }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
