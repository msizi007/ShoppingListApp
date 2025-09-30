import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { login } from "../features/login";

export default function Login() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);

  return (
    <div>
      <p> Username: {username}</p>
      <button
        onClick={() =>
          dispatch(login({ username: "Msizi", password: "123456" }))
        }
      >
        Display
      </button>
    </div>
  );
}
