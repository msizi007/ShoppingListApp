import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { loginUser } from "../features/userSlice";
import { getLocalUser, setLocalUser } from "../utils/storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    const user = getLocalUser();
    if (user) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {

    if (user) {
      setLocalUser(user);
      navigate("/home");
    }
  }, [user, navigate]);

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-4">
            {/* Login Card */}
            <div className="card shadow border-0 rounded-4 overflow-hidden py-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-dark">Welcome Back</h2>
                  <p className="text-muted small">
                    Please enter your details to sign in
                  </p>
                </div>

                <form onSubmit={onHandleSubmit}>
                  <InputField
                    type="email"
                    field={email}
                    setField={setEmail}
                    placeholder="Email Address"
                    icon={FaEnvelope}
                  />

                  <InputField
                    type="password"
                    placeholder="Password"
                    field={password}
                    setField={setPassword}
                    icon={FaLock}
                    hint="Must be at least 6 characters"
                  />

                  {error && (
                    <div className="mb-3">
                      <Popup type="danger" text={error} />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
                  >
                    {loading ? "Signing In..." : "Login"}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="small text-muted mb-0">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-primary fw-bold text-decoration-none"
                    >
                      Register now
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Home Link */}
            <div className="text-center mt-3">
              <Link
                to="/"
                className="small text-secondary text-decoration-none"
              >
                ← Back to Landing Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
