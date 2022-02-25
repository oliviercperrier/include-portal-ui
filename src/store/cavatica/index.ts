import { useSelector } from "react-redux";
import {cavaticaSelector} from "./selector";

export type { initialState as cavaticaInitialState } from "./types";
export { default, CavaticaState } from "./slice";
export const useCavatica = () => useSelector(cavaticaSelector);
