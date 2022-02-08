import {
  TFilterData,
  VisualType,
} from "@ferlab/ui/core/components/filters/types";
import { updateFilters } from "@ferlab/ui/core/data/filters/utils";
import history from "utils/history";

export const addFieldToActiveQuery = (
  fieldName: string,
  value: TFilterData,
  type: VisualType
) => {
  updateFilters(
    history,
    {
      field: fieldName,
      title: "",
      type,
    },
    [
      {
        data: value,
        name: "",
        id: fieldName,
      },
    ]
  );
};
