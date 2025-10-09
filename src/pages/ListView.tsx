import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSingleShoppingList } from "../features/shoppingListSlice";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useEffect } from "react";

export default function ListView() {
  const { id } = useParams()!;
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log(101);

    dispatch(getSingleShoppingList(id!));
  }, [location.pathname]);
  console.log(id);

  const list = useAppSelector((state) => state.shoppingLists);
  console.log(list);

  return (
    <>
      <h2 className="text-center mt-5">{list.name}</h2>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Description:{" "}
                  {list.description ? list.description : "No description"}
                </h5>
                <p className="card-text">
                  {list.dateCreated.toString().split("T")[0]}
                </p>
                <p className="card-text">
                  {list.dateCreated
                    .toString()
                    .split("T")[1]
                    .split(".")[0]
                    .split(":")[0] +
                    "h" +
                    list.dateCreated
                      .toString()
                      .split("T")[1]
                      .split(".")[0]
                      .split(":")[1]}
                </p>
              </div>
            </div>
            // display items
            <h4>Items</h4>
          </div>
        </div>
      </div>
    </>
  );
}
