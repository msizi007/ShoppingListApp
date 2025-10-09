import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/Modal/Modal";
import InputField from "../components/InputField/InputField";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  addShoppingList,
  type Category,
  deleteShoppingList,
  getShoppingLists,
} from "../features/shoppingListSlice";
import { getUser } from "../utils/storage";
import ShoppingListCard from "../components/Card/ShoppingListCard";
import SingleSelectorTag from "../components/Tag/SingleSelectorTag";
import { useNavigate } from "react-router-dom";
import { getItemCount, getItems } from "../features/itemSlice";

export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<Category>("Groceries");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = getUser().id;
  const tags: Category[] = [
    "Groceries",
    "Clothing",
    "Electronics",
    "Party",
    "Personal Care",
  ];

  const shoppingLists = useAppSelector((state) => state.shoppingLists.list);

  useEffect(() => {
    if (!getUser().isLoggedIn) navigate("/");
    dispatch(getShoppingLists(userId));
  }, []);

  useEffect(() => {
    if (shoppingLists.length > 0) {
      shoppingLists.forEach((list: any) => {
        dispatch(getItems(list.id));
      });
    }
  }, [shoppingLists]);
  const items = useAppSelector((state) => state.items.list);

  console.log("Home, items: ", items);

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
      {shoppingLists.length > 0 ? (
        <div className="row mx-2">
          {shoppingLists.map((list: any) => {
            const itemCount = items.filter(
              (item: any) => item.listId === list.id
            ).length;

            return (
              <ShoppingListCard
                id={list.id}
                key={list.id}
                title={list.name}
                quantity={itemCount}
                category={list.category}
                description={list.description}
                dateCreated={list.dateCreated}
                onDelete={() => dispatch(deleteShoppingList(list.id))}
              />
            );
          })}
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
            {tags.map((tag: Category) => (
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
            onClick={() => {
              dispatch(
                addShoppingList({
                  name,
                  description,
                  category,
                  userId,
                  dateCreated: new Date().toString(),
                })
              );
              // reset the states
              setIsCreating(false);
              setName("");
              setDescription("");
            }}
          >
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
}
