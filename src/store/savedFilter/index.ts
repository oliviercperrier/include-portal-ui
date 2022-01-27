import { useSelector } from "react-redux";
import { savedFilterSelector } from "./selector";

export type { initialState as SavedFilterInitialState } from "./types";
export { default, SavedFilterState } from "./slice";
export const useSavedFilter = () => useSelector(savedFilterSelector);
