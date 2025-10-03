import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/registerSlice";

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
    if (isRegistered) navigate("/login");
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
          placeholder="Username"
          field={email}
          setField={setEmail}
        />
        <InputField
          type="text"
          placeholder="Password"
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
