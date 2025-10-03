import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/registerSlice";
import Popup from "../components/Popup/Popup";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const isRegistered = useAppSelector((state) => state.register.isRegistered);
  const errorMessage = useAppSelector((state) => state.register.errorMessage);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) navigate("/login");
  }, [isRegistered]);

  function onHandleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(
      registerUser({
        name,
        surname,
        cellNumber,
        email,
        password,
      })
    );
  }
  return (
    <div className="RegisterPage">
      <div className="container">
        <h1>Register</h1>
        <InputField
          type="text"
          field={name}
          setField={setName}
          placeholder="Name"
        />
        <InputField
          type="text"
          placeholder="Surname"
          field={surname}
          setField={setSurname}
        />
        <InputField
          type="text"
          placeholder="Cell Number"
          field={cellNumber}
          setField={setCellNumber}
        />
        <InputField
          type="email"
          placeholder="Email"
          field={email}
          setField={setEmail}
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
          Already have an account? <Link to="/login">login</Link> instead
        </p>
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
