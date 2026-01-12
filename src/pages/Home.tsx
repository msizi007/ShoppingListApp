import { useEffect, useState } from "react";
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
  sortByCategory,
  sortByDate,
  sortByName,
} from "../features/shoppingListSlice";
import { getUser } from "../utils/storage";
import ShoppingListCard from "../components/Card/ShoppingListCard";
import SingleSelectorTag from "../components/Tag/SingleSelectorTag";
import { useNavigate } from "react-router-dom";
import { getItems } from "../features/itemSlice";
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
  // Ensure getUser().id is safely accessed
  const userId = getUser()?.id;

  const tags: Category[] = [
    "Groceries",
    "Clothing",
    "Electronics",
    "Party",
    "Personal Care",
    "Stationery",
  ];

  const shoppingLists = useAppSelector((state) => state.shoppingLists.list);

  // Use a proper state for the initial loading check
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Effect 1: Check login and fetch lists initially
  useEffect(() => {
    if (!getUser()?.isLoggedIn) {
      navigate("/");
    } else if (userId) {
      dispatch(getShoppingLists(userId)).then(() => {
        setIsInitialLoad(false);
      });
    }
  }, [dispatch, navigate, userId]);

  // Effect 2: Fetch items once lists are available (or after initial load)
  useEffect(() => {
    if (!isInitialLoad && shoppingLists.length > 0) {
      shoppingLists.forEach((list: any) => {
        dispatch(getItems(list.id));
      });
    }
  }, [dispatch, shoppingLists, isInitialLoad]);

  const items = useAppSelector((state) => state.items.list);
  const filteredList = useAppSelector(
    (state) => state.shoppingLists.filteredList
  );

  const handleAddList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name.trim() === "" || !userId) return; // Prevent adding empty names or if userId is missing

    dispatch(
      addShoppingList({
        name,
        description,
        category,
        userId,
        dateCreated: new Date().toString(),
      })
    );
    // reset the states and close modal
    setIsCreating(false);
    setName("");
    setDescription("");
    setCategory("Groceries"); // Reset to default category
  };

  return (
    // 1. Apply min-vh-100 to ensure full height
    // 2. Use d-flex and flex-column to enable column-based flex layout
    // 3. Use className="flex-grow-1" on the content div to push the footer down
    <div className="d-flex flex-column min-vh-100">
      <Navbar isLoggedIn={true} />

      {/* Main Content Container: Use flex-grow-1 to take up all available vertical space */}
      <main className="flex-grow-1">
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
            onChange={(e) => {
              if (e.target.value === "Name") {
                dispatch(sortByName());
              } else if (e.target.value === "Category") {
                dispatch(sortByCategory());
              } else if (e.target.value === "Date") {
                dispatch(sortByDate());
              }
            }}
          >
            <option className="text-muted">Sort By</option>
            <option value="Name">Name</option>
            <option value="Category">Category</option>
            <option value="Date">Date</option>
          </select>
        </div>
        <div className="d-flex justify-content-end my-2 mx-3">
          <button
            className="btn btn-primary"
            onClick={() => setIsCreating(true)}
          >
            Add List
          </button>
        </div>

        {shoppingLists.length > 0 ? (
          <div className="row mx-2">
            {(searchKeyWord.length > 0 ? filteredList : shoppingLists).map(
              (list: any) => {
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
                    onDelete={() => {
                      dispatch(deleteShoppingList(list.id));
                      window.location.reload();
                    }}
                  />
                );
              }
            )}
          </div>
        ) : (
          <div className="text-center mt-5">
            <h2>Nothing Available at the moment.</h2>
            <p>All added lists will appear here.</p>
          </div>
        )}
      </main>

      <Modal isOpened={isCreating}>
        <div className="d-flex justify-content-end">
          <button
            className="btn-close"
            aria-label="Close"
            onClick={() => setIsCreating(false)}
          ></button>
        </div>
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
          <div className="d-flex flex-wrap gap-2 tagContainer my-4">
            {tags.map((tag: Category) => (
              <SingleSelectorTag
                key={tag}
                text={tag}
                state={category}
                setState={setCategory}
              />
            ))}
          </div>
          <button className="btn btn-primary w-100" onClick={handleAddList}>
            Add List
          </button>
        </form>
      </Modal>

      {/* Footer component pushed to the bottom */}
      <Footer />
    </div>
  );
}
