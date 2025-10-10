import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal/Modal";
import InputField from "../components/InputField/InputField";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  addShoppingList,
  type Category,
  deleteShoppingList,
  getShoppingLists,
  searchShoppingList,
  sortByName,
} from "../features/shoppingListSlice";
import { getUser } from "../utils/storage";
import ShoppingListCard from "../components/Card/ShoppingListCard";
import SingleSelectorTag from "../components/Tag/SingleSelectorTag";
import { useNavigate } from "react-router-dom";
import { getItemCount, getItems } from "../features/itemSlice";
import Filter from "../components/Filter";
import { BsSearch } from "react-icons/bs";
import Footer from "../components/Footer/Footer";

export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState<string>("");
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");

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
    "Stationery",
  ];

  const shoppingLists = useAppSelector((state) => state.shoppingLists.list);

  useEffect(() => {
    if (!getUser().isLoggedIn) navigate("/");
    dispatch(getShoppingLists(userId));
    console.log(shoppingLists);
  }, []);

  useEffect(() => {
    dispatch(getShoppingLists(userId));
    if (shoppingLists.length > 0) {
      shoppingLists.forEach((list: any) => {
        dispatch(getItems(list.id));
      });
    }
  }, [shoppingLists]);
  const items = useAppSelector((state) => state.items.list);
  const filteredList = useAppSelector(
    (state) => state.shoppingLists.filteredList
  );

  return (
    <div className="homePage">
      <Navbar isLoggedIn={true} />

      <div className="input-group input-group-lg p-5">
        <span className="input-group-text bg-white border-end-0 text-muted">
          <BsSearch />
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search..."
          value={searchKeyWord}
          onChange={(e) => {
            setSearchKeyWord(e.target.value);
            dispatch(searchShoppingList(e.target.value));
          }}
        />
        <select
          className="form-select border-start-0"
          onChange={() => dispatch(sortByName())}
        >
          <option className="text-muted">Sort By</option>
          <option>Name</option>
          <option>Category</option>
          <option>Date</option>
        </select>
      </div>
      <div className="d-flex justify-content-end my-2 mx-3">
        <button className="btn btn-primary" onClick={() => setIsCreating(true)}>
          Add List
        </button>
      </div>

      {shoppingLists.length > 0 ? (
        <div className="row mx-2">
          {filteredList.length > 0
            ? filteredList.map((list: any) => {
                const itemCount = items.filter(
                  (item: any) => item.listId === list.id
                ).length;

                return (
                  <ShoppingListCard
                    id={list.id}
                    userId={list.userId}
                    list={shoppingLists}
                    key={list.id}
                    title={list.name}
                    quantity={itemCount}
                    category={list.category}
                    description={list.description}
                    dateCreated={list.dateCreated}
                    onDelete={() => dispatch(deleteShoppingList(list.id))}
                  />
                );
              })
            : shoppingLists.map((list: any) => {
                const itemCount = items.filter(
                  (item: any) => item.listId === list.id
                ).length;

                return (
                  <ShoppingListCard
                    id={list.id}
                    userId={list.userId}
                    list={shoppingLists}
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
          <h4 className="my-4">Add New List</h4>
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
              setIsCreating(false);
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
      <Footer />
    </div>
  );
}
