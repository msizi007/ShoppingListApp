import { BsPersonFill } from "react-icons/bs";
import { FaHome, FaKey, FaSignOutAlt } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import InputField from "../components/InputField/InputField";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const isRegistered = useAppSelector((state) => state.register.isRegistered);
  const errorMessage = useAppSelector((state) => state.register.errorMessage);
  const navigate = useNavigate();

  const fname = useAppSelector((state) => state.register.name);
  return (
    <div className="row mx-2">
      <div className="col-4">
        <div className="d-flex justify-content-center m-2 mt-5">
          <BsPersonFill
            size={120}
            style={{
              width: "fit-content",
              padding: "1rem",
              border: "2px solid black",
              borderRadius: "50%",
            }}
          />
        </div>

        <div className="d-flex flex-column p-1">
          <button className="btn btn-outline-primary p-3">
            <FaHome /> Dashboard
          </button>
          <button className="btn btn-outline-primary p-3">
            <FaPerson /> Account Details
          </button>
          <button className="btn btn-outline-primary p-3">
            <FaKey /> Change Password
          </button>
          <button className="btn btn-outline-primary p-3">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
      <div className="col-8 mt-5 px-2">
        <h2 className="text-center">Account</h2>
        <InputField
          type="text"
          placeholder="Name"
          field={name}
          setField={setName}
        />
        <InputField
          type="text"
          placeholder="First Name"
          field={name}
          setField={setName}
        />
        <InputField
          type="text"
          placeholder="First Name"
          field={name}
          setField={setName}
        />
        <InputField
          type="text"
          placeholder="First Name"
          field={name}
          setField={setName}
        />
        <InputField
          type="text"
          placeholder="First Name"
          field={name}
          setField={setName}
        />
        <InputField
          type="text"
          placeholder="First Name"
          field={name}
          setField={setName}
        />
        <InputField
          type="text"
          placeholder="First Name"
          field={name}
          setField={setName}
        />
      </div>
    </div>
  );
}
