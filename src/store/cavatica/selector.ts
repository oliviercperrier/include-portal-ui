import { RootState } from "store/types";
import { initialState } from "store/cavatica/types";

export type CavaticaProps = initialState;

export const cavaticaSelector = (state: RootState) => {
  return state.cavatica;
};
