import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/Modal/Modal";
import InputField from "../components/InputField/InputField";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  addShoppingList,
  getShoppingLists,
} from "../features/shoppingListSlice";
import { getUser } from "../utils/storage";
import Card from "../components/Card/Card";

export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const dispatch = useAppDispatch();
  const userId = getUser().id;

  useEffect(() => {
    dispatch(getShoppingLists(userId));
  }, []);

  const shoppingLists = useAppSelector((state) => state.shoppingLists.list);

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
      {shoppingLists ? (
        <div className="row mx-2">
          {shoppingLists.map((list: any) => (
            <Card
              title={list.name}
              quantity={list.items.length}
              category={list.category}
              description={list.description}
            />
          ))}
        </div>
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
        <form>
          <h6 className="my-4">Add New List</h6>
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
            <span className="tag" onClick={() => setCategory("Groceries")}>
              Groceries
            </span>
            <span className="tag" onClick={() => setCategory("Household")}>
              Household
            </span>
            <span className="tag" onClick={() => setCategory("Personal Care")}>
              Personal Care
            </span>
            <span
              className="tag"
              onClick={() => setCategory("Electronics and Tech")}
            >
              Electronics and Tech
            </span>
            <span className="tag" onClick={() => setCategory("Clothing")}>
              Clothing
            </span>
            <span className="tag" onClick={() => setCategory("Event")}>
              Event
            </span>
          </div>
          <button
            className="btn btn-primary"
            onClick={() =>
              dispatch(
                addShoppingList({
                  name,
                  description,
                  category,
                  userId,
                  quantity: 0,
                  items: [],
                  dateCreated: new Date(),
                })
              )
            }
          >
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
}
