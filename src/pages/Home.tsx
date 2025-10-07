import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/Modal/Modal";
import InputField from "../components/InputField/InputField";

export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const lists = 1;
  return (
    <div className="homePage">
      <Navbar isLoggedIn={true} />
      <div className="input-group flex-nowrap p-5">
        <input type="text" className="form-control" placeholder="Search..." />
        <button className="btn btn-outline-secondary" id="addon-wrapping">
          Search
        </button>
        <button
          className="btn btn-primary"
          id="addon-wrapping"
          onClick={() => setIsCreating(true)}
        >
          Add New
        </button>
      </div>
      {lists ? (
        0
      ) : (
        <>
          <h2 className="text-center mt-5">Nothing Available at the moment.</h2>
          <p className="text-center">All added lists willl appear here..</p>
        </>
      )}
      <Modal isOpened={isCreating}>
        <button
          style={{ border: "none", backgroundColor: "white" }}
          onClick={() => setIsCreating(false)}
        >
          X
        </button>
        <form className="mt-2">
          <h6>Add New List</h6>
          <InputField
            type="text"
            placeholder="Name.."
            field={name}
            setField={setName}
          />
          <InputField
            type="text"
            placeholder="Optional Notes.."
            field={description}
            setField={setDescription}
          />
          <div className="d-flex flex-row tagContainer my-4">
            <span className="tag">Groceries</span>
            <span className="tag">Household</span>
            <span className="tag">Personal Care</span>
            <span className="tag">Electronics and Tech</span>
            <span className="tag">Clothing</span>
            <span className="tag">Event</span>
          </div>
          <button className="btn btn-primary">Add</button>
        </form>
      </Modal>
    </div>
  );
}
