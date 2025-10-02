import { useEffect, useState } from "react";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useNavigate } from "react-router-dom";
import { login } from "../features/userSlice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) navigate("/home");
  }, [isLoggedIn, navigate]);

  function onHandleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(login({ username, password }));
  }
  return (
    <div className="LoginPage">
      <div className="container">
        <h1>Login</h1>
        <InputField
          type="text"
          field={username}
          setField={setUsername}
          placeholder="Name"
        />
        <InputField
          type="text"
          placeholder="Surname"
          field={password}
          setField={setPassword}
        />
        <Button
          text="Register"
          onClick={(e) => onHandleSubmit(e)}
          width={100}
          color="white"
          bg="#3b82f6"
        />
      </div>
    </div>
  );
}
