import { useSelector } from "react-redux";
import { fenceSelector } from "./selector";

export type { initialState as FenceInitialState } from "./types";
export { default, FenceState } from "./slice";
export const useFence = () => useSelector(fenceSelector);