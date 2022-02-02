import { useSelector } from "react-redux";
import { userSelector } from "./selector";

export type { initialState as ReportInitialState } from "./types";
export { default, ReportState } from "./slice";
export const useGenerateReport = () => useSelector(userSelector);
