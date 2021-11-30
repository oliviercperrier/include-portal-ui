import { useSelector } from "react-redux";
import { globalSelector } from "./selector";

export type { initialState as GlobalInitialState } from "./types";
export { default, GlobalState } from "./reducer";
export const useGlobals = () => useSelector(globalSelector);
