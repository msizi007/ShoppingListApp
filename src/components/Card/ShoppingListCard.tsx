import { BsEyeFill, BsPenFill, BsTrashFill } from "react-icons/bs";
import clothingImg from "./../../assets/clothing.jpg";
import eletronicsImg from "./../../assets/eletronicsTech.jpg";
import groceriesImg from "./../../assets/groceries.jpg";
import partyImg from "./../../assets/party.jpg";
import personalCareImg from "./../../assets/personalCare.jpg";

interface Props {
  title: string;
  quantity: number;
  description: string;
  category: string;
}

export default function ShoppingListCard(props: Props) {
  return (
    <div className="col-4 d-flex">
      <div className="card w-100 d-flex flex-column">
        <img
          className="card-img-top"
          src=""
          alt="Card image cap"
        />
        <div className="card-body flex-grow-1">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text text-muted">{props.description}</p>
          <p
            className="card-text bg-primary text-white d-inline-block px-2 py-1 rounded mb-1"
            style={{ fontSize: "0.7rem" }}
          >
            {props.category}
          </p>
          <small className="text-muted d-block text-end">
            {props.quantity} items
          </small>
        </div>
        <div className="card-footer">
          <button className="btn btn-md btn-outline-secondary mx-1">
            <BsEyeFill />
          </button>
          <button className="btn btn-md btn-outline-primary mx-1">
            <BsPenFill />
          </button>
          <button className="btn btn-md btn-outline-danger mx-1">
            <BsTrashFill />
          </button>
        </div>
      </div>
    </div>
  );
}
