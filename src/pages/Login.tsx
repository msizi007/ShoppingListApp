import { useState } from "react";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onHandleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
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
