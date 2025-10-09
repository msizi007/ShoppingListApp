import { BsEyeFill, BsPersonFill } from "react-icons/bs";
import InputField from "../components/InputField/InputField";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";

import { getUserProfile, updateUserProfile } from "../features/profileSlice";
import { getUser } from "../utils/storage";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userId = getUser().id;

  useEffect(() => {
    if (!getUser().isLoggedIn) navigate("/");
  }, []);

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserProfile(userId));
  }, [userId]);

  // user state
  let _name = useAppSelector((state) => state.profile.name);
  let _surname = useAppSelector((state) => state.profile.surname);
  const _cellNumber = useAppSelector((state) => state.profile.cellNumber);
  const _email = useAppSelector((state) => state.profile.email);

  // sync states and store data
  useEffect(() => {
    if (_name) setName(_name);
    if (_surname) setSurname(_surname);
    if (_cellNumber) setCellNumber(_cellNumber);
    if (_email) setEmail(_email);
    if (_name && _surname) setFullName(_name + " " + _surname);
  }, [_name, _surname, _cellNumber, _email]);

  // states
  const [name, setName] = useState(_name);
  const [surname, setSurname] = useState(_surname);
  const [fullName, setFullName] = useState(_name + " " + _surname);
  const [cellNumber, setCellNumber] = useState(_cellNumber);
  const [email, setEmail] = useState(_email);
  const [isNotEditable, setNotIsEditable] = useState(true);

  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className="mx-4">
        <div className=" mt-5 px-2">
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
          <h2 className="text-center">{fullName}</h2>
          <InputField
            type="text"
            placeholder="Name"
            field={name}
            setField={setName}
            isDisabled={isNotEditable}
          />
          <InputField
            type="text"
            placeholder="Surname"
            field={surname}
            setField={setSurname}
            isDisabled={isNotEditable}
          />
          <InputField
            type="text"
            placeholder="Cell Number"
            field={cellNumber}
            setField={setCellNumber}
            isDisabled={isNotEditable}
          />
          <InputField
            type="email"
            placeholder="Email"
            field={email}
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
          <button
            className="btn btn-primary mx-2"
            onClick={() => {
              dispatch(
                updateUserProfile({
                  id: userId,
                  name,
                  surname,
                  cellNumber,
                  email,
                })
              );
            }}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}
