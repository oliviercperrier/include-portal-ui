import { RootState } from "store/types";
import { initialState } from "store/fence/types";

export type FenceProps = initialState;

export const fenceSelector = (state: RootState) => {
  return state.fence;
};
