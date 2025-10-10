import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getShoppingLists,
  getSingleShoppingList,
  sortByName,
} from "../features/shoppingListSlice";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useEffect, useReducer, useState } from "react";
import {
  deleteItem,
  getItemCount,
  getItems,
  searchItems,
  updateItem,
} from "../features/itemSlice";
import { getUser } from "../utils/storage";
import { BsPenFill, BsSearch, BsTrashFill } from "react-icons/bs";
import Tag from "../components/Tag/Tag";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import InputField from "../components/InputField/InputField";

export default function ListView() {
  const { id } = useParams()!;
  const dispatch = useAppDispatch();
  const shoppingLists = useAppSelector((state) => state.shoppingLists.list);
  const userId = getUser().id;

  useEffect(() => {
    dispatch(getShoppingLists(userId));
  }, []);

  useEffect(() => {
    if (shoppingLists.length > 0) {
      shoppingLists.forEach((list: any) => {
        dispatch(getItems(list.id));
      });
    }
  }, [shoppingLists]);

  const list = shoppingLists.find((list: any) => list.id === id)!;

  const allItems = useAppSelector((state) => state.items.list);

  const items = allItems.filter((item: any) => item.listId === id);

  const itemCount = items.length;

  const [isEdditing, setIsEdditing] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemId, setItemId] = useState("");

  const filteredItems = useAppSelector((state) => state.items.filterdList);

  function handleEdit(itemId: string) {
    setIsEdditing(true);
    const item = items.find((item: any) => item.id === itemId);
    setName(item!.name);
    setQuantity(item!.quantity);
    setItemId(item!.id!);
  }
  const [searchKeyWord, setSearchKeyWord] = useState("");

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar isLoggedIn={getUser().isLoggedIn} />
      {list && (
        <>
          <h1 className="text-center mt-5">{list.name}</h1>
          <main className="container flex-grow-1">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title my-2">
                      Description:{" "}
                      {list.description ? list.description : "No description"}
                    </h5>
                    <p className="card-text">Category: {list.category}</p>
                    <p className="card-text">
                      {list.dateCreated.split(" ").slice(0, 4).join(" ")}
                    </p>
                    <p style={{ width: "fit-content" }}>
                      <Tag text={list.category} />
                    </p>
                  </div>
                </div>

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
                      dispatch(searchItems(e.target.value));
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

                <h3 className="mt-5">{itemCount} Items</h3>

                {itemCount > 0 ? (
                  <>
                    {filteredItems.length > 0
                      ? filteredItems.map((item: any) => {
                          return (
                            <div key={item.id} className="card my-2">
                              <div className="card-body row align-items-center">
                                <div className="col-8">
                                  <h5 className="card-title">{item.name}</h5>
                                  <p className="card-text">
                                    Quantity: {item.quantity}
                                  </p>
                                  <small className="card-text">
                                    {item.dateCreated
                                      .split(" ")
                                      .slice(0, 4)
                                      .join(" ")}
                                  </small>
                                </div>
                                <div className="col-4 text-end">
                                  <button
                                    className="btn btn-lg btn-outline-primary mx-1"
                                    onClick={() => handleEdit(item.id)}
                                  >
                                    <BsPenFill />
                                  </button>
                                  <button
                                    className="btn btn-lg btn-outline-danger mx-1"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Are you sure you want to delete?"
                                        )
                                      )
                                        dispatch(deleteItem(item.id));
                                    }}
                                  >
                                    <BsTrashFill />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : items.map((item: any) => {
                          return (
                            <div key={item.id} className="card my-2">
                              <div className="card-body row align-items-center">
                                <div className="col-8">
                                  <h5 className="card-title">{item.name}</h5>
                                  <p className="card-text">
                                    Quantity: {item.quantity}
                                  </p>
                                  <small className="card-text">
                                    {item.dateCreated
                                      .split(" ")
                                      .slice(0, 4)
                                      .join(" ")}
                                  </small>
                                </div>
                                <div className="col-4 text-end">
                                  <button
                                    className="btn btn-lg btn-outline-primary mx-1"
                                    onClick={() => handleEdit(item.id)}
                                  >
                                    <BsPenFill />
                                  </button>
                                  <button
                                    className="btn btn-lg btn-outline-danger mx-1"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Are you sure you want to delete?"
                                        )
                                      )
                                        dispatch(deleteItem(item.id));
                                    }}
                                  >
                                    <BsTrashFill />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </>
                ) : (
                  <div className="card my-2">
                    <div className="card-body row align-items-center">
                      <h5 className="card-title">No items found</h5>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
      )}

      <Modal isOpened={isEdditing}>
        <button className="btn mb-4" onClick={() => setIsEdditing(false)}>
          X
        </button>
        <h4>Update Item</h4>
        <InputField
          type="text"
          field={name}
          setField={setName}
          placeholder="Item Name"
        />
        <InputField
          type="text"
          field={quantity}
          setField={setQuantity}
          placeholder="Quantity"
        />
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            setIsEdditing(false);
            dispatch(
              updateItem({
                id: itemId,
                name,
                quantity,
                dateCreated: new Date().toString(),
                listId: list.id!,
              })
            );
          }}
        >
          Update
        </button>
      </Modal>
      <Footer />
    </div>
  );
}
