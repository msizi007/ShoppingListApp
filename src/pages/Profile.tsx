import { BsEyeFill, BsPersonFill } from "react-icons/bs";
import { FaHome, FaKey, FaSignOutAlt } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import InputField from "../components/InputField/InputField";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfile } from "../features/profileSlice";
import { getUser } from "../utils/storage";

export default function Profile() {
  const dispatch = useAppDispatch();

  const userId = getUser().id;

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserProfile(userId));
  }, [userId]);

  // user state
  const _name = useAppSelector((state) => state.profile.name);
  const _surname = useAppSelector((state) => state.profile.surname);
  const _cellNumber = useAppSelector((state) => state.profile.cellNumber);
  const _email = useAppSelector((state) => state.profile.email);

  // states
  const [name, setName] = useState(_name);
  const [surname, setSurname] = useState(_surname);
  const [cellNumber, setCellNumber] = useState(_cellNumber);
  const [email, setEmail] = useState(_email);
  const [isNotEditable, setNotIsEditable] = useState(true);
  const navigate = useNavigate();

  console.log({ userId, name, surname, cellNumber, email });

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
          field={_name}
          setField={setName}
          isDisabled={isNotEditable}
        />
        <InputField
          type="text"
          placeholder="Surname"
          field={_surname}
          setField={setSurname}
          isDisabled={isNotEditable}
        />
        <InputField
          type="text"
          placeholder="Cell Number"
          field={_cellNumber}
          setField={setCellNumber}
          isDisabled={isNotEditable}
        />
        <InputField
          type="email"
          placeholder="Email"
          field={_email}
          setField={setEmail}
          isDisabled={isNotEditable}
        />
        <button
          className={
            isNotEditable ? "btn btn-outline-secondary" : "btn btn-secondary"
          }
          onClick={
            isNotEditable
              ? () => setNotIsEditable(false)
              : () => setNotIsEditable(true)
          }
        >
          <BsEyeFill />
        </button>
        <button className="btn btn-primary mx-2">Update</button>
      </div>
    </div>
  );
}
