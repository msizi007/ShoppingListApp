import { BsEyeFill, BsPenFill, BsTrashFill } from "react-icons/bs";
import clothingImg from "./../../assets/clothing.png";
import eletronicsImg from "./../../assets/electronicsTech.png";
import groceriesImg from "./../../assets/groceries.png";
import partyImg from "./../../assets/party.jpg";
import personalCareImg from "./../../assets/personalCare.png";
import stationeryImg from "./../../assets/stationery.png";
import {
  addShoppingList,
  updateShoppingList,
  type Category,
  type shoppingList,
} from "../../features/shoppingListSlice";
import Modal from "../Modal/Modal";
import { useState } from "react";
import InputField from "../InputField/InputField";
import { useAppDispatch } from "../../../reduxHooks";
import { addItem } from "../../features/itemSlice";
import { useNavigate } from "react-router-dom";
import SingleSelectorTag from "../Tag/SingleSelectorTag";

interface Props {
  id: string;
  userId: string;
  title: string;
  quantity: number;
  description: string;
  category: Category;
  dateCreated: Date;
  list: shoppingList[];
  onDelete: () => void;
}

export default function ShoppingListCard(props: Props) {
  let cardImage = groceriesImg;

  switch (props.category) {
    case "Clothing":
      cardImage = clothingImg;
      break;
    case "Electronics":
      cardImage = eletronicsImg;
      break;
    case "Groceries":
      cardImage = groceriesImg;
      break;
    case "Party":
      cardImage = partyImg;
      break;
    case "Personal Care":
      cardImage = personalCareImg;
      break;
    case "Stationery":
      cardImage = stationeryImg;
      break;
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [isEdditing, setIsEdditing] = useState(false);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState<Category>("Groceries");
  const [description, setDescription] = useState<string>("");
  const tags: Category[] = [
    "Groceries",
    "Clothing",
    "Electronics",
    "Party",
    "Personal Care",
    "Stationery",
  ];
  const userId = props.userId;

  const handleEdit = (id: string) => {
    setIsEdditing(true);

    const list = props.list.find((list: any) => list.id === id)!;

    setName(list.name);
    setCategory(list.category);
    setDescription(list.description);
    setCategory(list.category);
  };

  return (
    <div className="col-4 d-flex">
      <div className="card w-100 d-flex flex-column">
        <img className="card-img-top" src={cardImage} alt="Card image cap" />
        <div className="card-body  d-flex flex-column justify-content-end">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text text-muted">{props.description}</p>
          <small className="text-muted d-block">
            {props.dateCreated.toString().split("T")[0]}
          </small>
          <p
            className="card-text bg-secondary text-white d-inline-block px-2 py-1 rounded mb-1"
            style={{ fontSize: "0.8rem", width: "fit-content" }}
          >
            {props.category}
          </p>

          <small className="text-muted d-block text-end">
            {props.quantity} items
          </small>
          <button
            className="btn btn-primary w-100"
            onClick={() => {
              setIsAdding(true);
            }}
          >
            Add Item
          </button>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-md btn-outline-secondary mx-2"
            onClick={() => navigate(`/listView/${props.id}`)}
          >
            <BsEyeFill /> View
          </button>
          <button
            className="btn btn-md btn-outline-primary mx-2"
            onClick={() => handleEdit(props.id)}
          >
            <BsPenFill /> Edit
          </button>
          <button
            className="btn btn-md btn-outline-danger mx-2"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this shopping list?"
                )
              )
                props.onDelete();
            }}
          >
            <BsTrashFill /> Delete
          </button>
        </div>
      </div>
      <Modal isOpened={isAdding}>
        <button
          style={{ border: "none", backgroundColor: "white" }}
          onClick={() => setIsAdding(false)}
        >
          X
        </button>
        <h4>Add New Item</h4>
        <InputField
          type="text"
          field={name}
          setField={setName}
          placeholder="Item Name"
        />
        <InputField
          type="number"
          field={quantity}
          setField={setQuantity}
          placeholder="Quantity"
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(
              addItem({
                name,
                quantity,
                listId: props.id,
                dateCreated: new Date().toString(),
              })
            );
            setIsAdding(false);
          }}
        >
          Add
        </button>
      </Modal>
      <Modal isOpened={isEdditing}>
        <button
          style={{ border: "none", backgroundColor: "white" }}
          onClick={() => setIsEdditing(false)}
        >
          X
        </button>
        <form>
          <h6 className="my-4">Update Item</h6>
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
                updateShoppingList({
                  id: props.id,
                  name,
                  description,
                  category,
                  userId,
                  dateCreated: new Date().toString(),
                })
              );
              // reset the states
              setIsEdditing(false);
              setName("");
              setDescription("");
            }}
          >
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
}
