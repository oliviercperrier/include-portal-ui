import { useSelector } from "react-redux";
import { fenceConnectionSelector } from "./selector";

export type { initialState as FenceConnectionInitialState } from "./types";
export { default, FenceConnectionState } from "./slice";
export const useFenceConnection = () => useSelector(fenceConnectionSelector);