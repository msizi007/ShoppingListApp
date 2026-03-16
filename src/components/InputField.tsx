import type { Dispatch, SetStateAction } from "react";
import type { IconType } from "react-icons";

interface Props {
  for?: string;
  type: string;
  placeholder: string;
  field: string;
  setField: Dispatch<SetStateAction<string>>;
  icon?: IconType;
  hint?: string;
  isDisabled?: boolean;
}

export default function InputField(props: Props) {
  return (
    <div className="mb-3">
      <div className="input-group">
        {/* Render Icon as a Bootstrap Input Group Text Addon */}
        {props.icon && (
          <span className="input-group-text bg-light text-secondary border-end-0">
            <props.icon />
          </span>
        )}

        <input
          type={props.type}
          id={props.for}
          className={`form-control ${props.icon ? "border-start-0" : ""}`}
          placeholder={props.placeholder}
          value={props.field}
          onChange={(e) => props.setField(e.target.value)}
          required
          disabled={props.isDisabled}
        />
      </div>

      {/* Hint Text */}
      {props.hint && (
        <div className="form-text text-muted ms-1">{props.hint}</div>
      )}
    </div>
  );
}
