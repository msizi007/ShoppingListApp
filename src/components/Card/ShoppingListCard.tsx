import { BsEyeFill, BsPenFill, BsTrashFill } from "react-icons/bs";
import clothingImg from "./../../assets/clothing.jpg";
import eletronicsImg from "./../../assets/electronicsTech.jpg";
import groceriesImg from "./../../assets/groceries.jpg";
import partyImg from "./../../assets/party.jpg";
import personalCareImg from "./../../assets/personalCare.jpg";
import type { Category } from "../../features/shoppingListSlice";
import Modal from "../Modal/Modal";
import { useState } from "react";
import InputField from "../InputField/InputField";
import { useAppDispatch } from "../../../reduxHooks";
import { addItem } from "../../features/itemSlice";

interface Props {
  id: string;
  title: string;
  quantity: number;
  description: string;
  category: Category;
  dateCreated: Date;
  onDelete: () => void;
}

export default function ShoppingListCard(props: Props) {
  let cardImage = null;

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
  }

  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState("");

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
          <button className="btn btn-md btn-outline-secondary mx-2">
            <BsEyeFill /> View
          </button>
          <button className="btn btn-md btn-outline-primary mx-2">
            <BsPenFill /> Edit
          </button>
          <button
            className="btn btn-md btn-outline-danger mx-2"
            onClick={() => props.onDelete()}
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
        <h4>Add Item</h4>
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
          onClick={() =>
            dispatch(
              addItem({
                name,
                quantity,
                listId: props.id,
                dateCreated: new Date(),
              })
            )
          }
        >
          Add
        </button>
      </Modal>
    </div>
  );
}
