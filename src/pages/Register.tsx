import { useState } from "react";
import { register } from "../features/userSlice";
import { useAppDispatch } from "../../reduxHooks";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  function onHandleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(
      register({
        name,
        surname,
        cellNumber,
        username,
        password,
        isLoggedIn: false,
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
          type="text"
          placeholder="Username"
          field={username}
          setField={setUsername}
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
