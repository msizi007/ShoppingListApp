import { useState } from "react";

interface Props {
  text: string;
}

export default function Tag(props: Props) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={"tag bg-primary text-white user-select-none"}
      onClick={() => {
        setActive(!active);
      }}
    >
      {props.text}
    </div>
  );
}
