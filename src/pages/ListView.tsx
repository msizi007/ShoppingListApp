import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getShoppingLists,
  getSingleShoppingList,
} from "../features/shoppingListSlice";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useEffect } from "react";
import { deleteItem, getItemCount, getItems } from "../features/itemSlice";
import { getUser } from "../utils/storage";
import { BsPenFill, BsTrashFill } from "react-icons/bs";
import Tag from "../components/Tag/Tag";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function ListView() {
  const { id } = useParams()!;
  const dispatch = useAppDispatch();
  const shoppingLists = useAppSelector((state) => state.shoppingLists.list);
  const userId = getUser().id;

  useEffect(() => {
    dispatch(getShoppingLists(userId));
    dispatch(getSingleShoppingList(id!));
  }, []);

  useEffect(() => {
    if (shoppingLists.length > 0) {
      shoppingLists.forEach((list: any) => {
        dispatch(getItems(list.id));
      });
    }
  }, [shoppingLists]);

  const list = useAppSelector((state) => state.shoppingLists.current);

  const allItems = useAppSelector((state) => state.items.list);

  const items = allItems.filter((item: any) => item.listId === id);

  const itemCount = items.length;

  console.log("items", items, itemCount);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar isLoggedIn={getUser().isLoggedIn} />
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
                <p style={{ width: "fit-content" }}>
                  <Tag text={list.category} />
                </p>
              </div>
            </div>

            <h3 className="mt-5">{itemCount} Items</h3>

            {itemCount > 0 ? (
              items.map((item: any) => {
                return (
                  <div key={item.id} className="card my-2">
                    <div className="card-body row align-items-center">
                      <div className="col-8">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">Quantity: {item.quantity}</p>
                        <small className="card-text">
                          {item.dateCreated.split("T")[0]}
                        </small>
                      </div>
                      <div className="col-4 text-end">
                        <button className="btn btn-lg btn-outline-primary mx-1">
                          <BsPenFill />
                        </button>
                        <button
                          className="btn btn-lg btn-outline-danger mx-1"
                          onClick={() => dispatch(deleteItem(item.id))}
                        >
                          <BsTrashFill />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
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
      <Footer />
    </div>
  );
}
