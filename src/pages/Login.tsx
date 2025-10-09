import { useEffect, useState } from "react";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/loginSlice";
import Popup from "../components/Popup/Popup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

  const errorMessage = useAppSelector((state) => state.login.errorMessage);

  useEffect(() => {
    if (isLoggedIn) navigate("/home");
  }, [isLoggedIn, navigate]);

  function onHandleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }
  return (
    <div className="loginPage">
      <div className="container">
        <h1 className="text-center my-3">Login</h1>
        <InputField
          type="email"
          field={email}
          setField={setEmail}
          placeholder="Email"
        />
        <InputField
          type="password"
          placeholder="Password"
          field={password}
          setField={setPassword}
          hint="Password must be at least 6 characters"
        />
        {errorMessage && <Popup type="danger" text={errorMessage} />}
        <p className="mini-text">
          Don't have an account? <Link to="/register">register</Link> now.
        </p>

        <Button
          text="Login"
          onClick={(e) => onHandleSubmit(e)}
          width={100}
          color="white"
          bg="#3b82f6"
        />
      </div>
    </div>
  );
}
