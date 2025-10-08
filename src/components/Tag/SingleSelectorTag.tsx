import type { Category } from "../../features/shoppingListSlice";

interface Props {
  text: Category;
  state: Category;
  setState: React.Dispatch<React.SetStateAction<Category>>;
}

export default function SingleSelectorTag(props: Props) {
  return (
    <div
      className={
        props.state == props.text
          ? "tag bg-primary text-white user-select-none"
          : "tag bg-secondary text-white user-select-none"
      }
      onClick={() => {
        props.setState(props.text);
      }}
    >
      {props.text}
    </div>
  );
}
