import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { FaUser, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";
import { registerUser } from "../features/userSlice";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/login");
  }, [user, navigate]);

  function onHandleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(
      registerUser({
        name,
        surname,
        cellNumber,
        email,
        password,
      }),
    );
  }

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            {/* Main Register Card */}
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <div className="card-body">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Create Account</h2>
                  <p className="text-muted">Join Shopify today</p>
                </div>

                <form onSubmit={onHandleSubmit}>
                  <div className="row g-2">
                    <div className="col-6">
                      <InputField
                        type="text"
                        field={name}
                        setField={setName}
                        placeholder="Name"
                        icon={FaUser}
                      />
                    </div>
                    <div className="col-6">
                      <InputField
                        type="text"
                        placeholder="Surname"
                        field={surname}
                        setField={setSurname}
                      />
                    </div>
                  </div>

                  <InputField
                    type="text"
                    placeholder="Cell Number"
                    field={cellNumber}
                    setField={setCellNumber}
                    icon={FaPhone}
                  />

                  <InputField
                    type="email"
                    placeholder="Email"
                    field={email}
                    setField={setEmail}
                    icon={FaEnvelope}
                  />

                  <InputField
                    type="password"
                    placeholder="Password"
                    field={password}
                    setField={setPassword}
                    icon={FaLock}
                  />
                  <InputField
                    type="password"
                    placeholder="Confirm Password"
                    field={confirmPassword}
                    setField={setConfirmPassword}
                    icon={FaLock}
                    hint="Password must be at least 6 characters and match"
                  />

                  {error && (
                    <div className="mb-3">
                      <Popup type="danger" text={error} />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-bold mt-2 shadow-sm"
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="small text-muted mb-0">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary fw-bold text-decoration-none"
                    >
                      Login
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
