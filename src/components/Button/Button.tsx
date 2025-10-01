interface Props {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  width: number;
  color?: string;
  bg?: string;
}

export default function Button(props: Props) {
  return (
    <button
      style={{
        width: `${props.width}%`,
        border: "none",
        padding: "1rem",
        color: props.color,
        backgroundColor: props.bg,
      }}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
