import styles from "./card.module.css";

interface Props {
  title: string;
  quantity: number;
  description: string;
  category: string;
}

export default function Card(props: Props) {
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text text-muted">{props.description}</p>
          <p className="card-text tag bg-primary">{props.category}</p>
        </div>
        <div className="card-footer">
          <small className="text-muted float-right">
            Quantity: {props.quantity}
          </small>
        </div>
      </div>
    </div>
  );
}
