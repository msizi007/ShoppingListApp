import { useParams } from "react-router-dom";
import { getShoppingLists } from "../features/shoppingListSlice";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useEffect, useState } from "react";
import { getItems, searchItems } from "../features/itemSlice";
import { getUser } from "../utils/storage";
import { BsSearch } from "react-icons/bs";
import Tag from "../components/Tag/Tag";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import Table from "../components/Table/Table";

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

  const list = shoppingLists.find((list: any) => list.id == id)!;

  const allItems = useAppSelector((state) => state.items.list);

  const items = allItems.filter((item: any) => item.listId == id);

  const itemCount = items.length;

  const filteredItems = useAppSelector((state) => state.items.filterdList);

  const [searchKeyWord, setSearchKeyWord] = useState("");

  console.log({ allItems, items, id });

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar isLoggedIn={getUser().isLoggedIn} />
      {list && (
        <>
          <h1 className="text-center mt-5">{list.name} </h1>
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

                <div className="input-group input-group-lg p-0 my-5">
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
                </div>

                <h3 className="mt-5">{itemCount} Items</h3>

                {itemCount > 0 ? (
                  <>
                    {filteredItems.length > 0 ? (
                      <Table items={filteredItems} list={list} />
                    ) : (
                      <Table items={items} list={list} />
                    )}
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

      <Footer />
    </div>
  );
}
