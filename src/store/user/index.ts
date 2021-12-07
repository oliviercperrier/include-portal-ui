import { useSelector } from "react-redux";
import { userSelector } from "./selector";

export type { initialState as UserInitialState } from "./types";
export { default, UserState } from "./reducer";
export const useUser = () => useSelector(userSelector);
