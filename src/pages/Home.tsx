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
import ShoppingListCard from "../components/Card/ShoppingListCard";
import Tag from "../components/Tag/Tag";
import SingleSelectorTag from "../components/Tag/SingleSelectorTag";

export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const dispatch = useAppDispatch();
  const userId = getUser().id;
  const tags = [
    "Groceries",
    "Clothing",
    "Electronics",
    "Party",
    "Personal Care",
  ];

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
            <ShoppingListCard
              key={list.id}
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
            {tags.map((tag: string) => (
              <SingleSelectorTag
                key={tag}
                text={tag}
                state={category}
                setState={setCategory}
              />
            ))}
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
