import {
  BsPenFill,
  BsSortDown,
  BsSortNumericDown,
  BsSortNumericUp,
  BsSortUp,
  BsTrashFill,
} from "react-icons/bs";
import { deleteItem, updateItem, type Item } from "../../features/itemSlice";
import { useState } from "react";
import { sortDate, sortName, sortQuantity } from "../../utils/filterSort";
import { useAppDispatch } from "../../../reduxHooks";
import Modal from "../Modal/Modal";
import InputField from "../InputField/InputField";
import type { shoppingList } from "../../features/shoppingListSlice";

interface Props {
  items: Item[];
  list: shoppingList;
}

export type Filter = "ASC" | "DESC";

export default function Table({ items, list }: Props) {
  const [nameFilter, setNameFilter] = useState<Filter>("DESC");
  const [quantityFilter, setQuantityFilter] = useState<Filter>("DESC");
  const [dateFilter, setDateFilter] = useState<Filter>("DESC");
  const [isEdditing, setIsEdditing] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemId, setItemId] = useState("");

  const dispatch = useAppDispatch();

  function handleEdit(itemId: string) {
    setIsEdditing(true);
    const item = items.find((item: any) => item.id === itemId);
    setName(item!.name);
    setQuantity(item!.quantity);
    setItemId(item!.id!);
  }

  return (
    <>
      <div className="container my-3 px-0">
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="border">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <span>Name</span>
                      <span className="d-flex gap-1">
                        {nameFilter === "ASC" && (
                          <BsSortDown
                            size={20}
                            onClick={() => {
                              setNameFilter("DESC");
                              sortName(items, "DESC");
                            }}
                          />
                        )}
                        {nameFilter === "DESC" && (
                          <BsSortUp
                            size={20}
                            onClick={() => {
                              setNameFilter("ASC");
                              sortName(items, "ASC");
                            }}
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="border">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <span>Quantity</span>
                      <span className="d-flex gap-1">
                        {quantityFilter === "ASC" && (
                          <BsSortNumericDown
                            size={20}
                            onClick={() => {
                              setQuantityFilter("DESC");
                              sortQuantity(items, "DESC");
                            }}
                          />
                        )}
                        {quantityFilter === "DESC" && (
                          <BsSortNumericUp
                            size={20}
                            onClick={() => {
                              setQuantityFilter("ASC");
                              sortQuantity(items, "ASC");
                            }}
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="border">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <span>Date</span>
                      <span className="d-flex gap-1">
                        {dateFilter === "ASC" && (
                          <BsSortDown
                            size={20}
                            onClick={() => {
                              setDateFilter("DESC");
                              sortDate(items, "DESC");
                            }}
                          />
                        )}
                        {dateFilter === "DESC" && (
                          <BsSortUp
                            size={20}
                            onClick={() => {
                              setDateFilter("ASC");
                              sortDate(items, "ASC");
                            }}
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      No items found.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td className="border">
                        <span>{item.name}</span>
                      </td>
                      <td className="border text-muted">{item.quantity}</td>
                      <td className="border">
                        {item.dateCreated
                          .split("T")[0]
                          .split(" ")
                          .splice(0, 4)
                          .join(" ")}
                      </td>

                      <td className="border d-flex justify-content-center">
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-lg btn-outline-primary mx-1"
                            onClick={() => handleEdit(item.id!)}
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
                                dispatch(deleteItem(item.id!));
                            }}
                          >
                            <BsTrashFill />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
    </>
  );
}
