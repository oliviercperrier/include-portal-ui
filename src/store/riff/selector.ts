import { RootState } from "store/types";
import { initialState } from "store/riff/types";

export type RiffProps = initialState;

export const riffSelector = (state: RootState) => {
  return state.riff;
};
