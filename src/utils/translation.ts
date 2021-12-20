import intl from "react-intl-universal";
import { IDictionary as FiltersDict } from "@ferlab/ui/core/components/filters/types";
import { IDictionary as QueryBuilderDict } from "@ferlab/ui/core/components/QueryBuilder/types";

export const getFiltersDictionary = (): FiltersDict => ({
  actions: {
    all: intl.get("global.filters.actions.all"),
    apply: intl.get("global.filters.actions.apply"),
    clear: intl.get("global.filters.actions.clear"),
    less: intl.get("global.filters.actions.less"),
    more: intl.get("global.filters.actions.more"),
    none: intl.get("global.filters.actions.none"),
  },
  operators: {
    between: intl.get("global.filters.operators.between"),
    lessThan: intl.get("global.filters.operators.lessthan"),
    lessThanOfEqual: intl.get("global.filters.operators.lessthanorequal"),
    greaterThan: intl.get("global.filters.operators.greaterthan"),
    greaterThanOrEqual: intl.get("global.filters.operators.greaterthanorequal"),
  },
  range: {
    is: intl.get("global.filters.range.is"),
    min: "min",
    max: "max",
  },
  checkBox: {
    searchPlaceholder: intl.get("global.filters.checkbox.placeholder"),
  },
  messages: {
    errorNoData: intl.get("global.filters.messages.empty"),
  },
});

export const getQueryBuilderDictionary = (
  facetResolver: (key: string) => React.ReactNode
): QueryBuilderDict => ({
  query: {
    combine: {
      and: intl.get("components.querybuilder.query.combine.and"),
      or: intl.get("components.querybuilder.query.combine.or"),
    },
    noQuery: intl.get("components.querybuilder.query.noQuery"),
    facet: facetResolver,
  },
  actions: {
    new: intl.get("components.querybuilder.actions.new"),
    addQuery: intl.get("components.querybuilder.actions.addQuery"),
    combine: intl.get("components.querybuilder.actions.combine"),
    labels: intl.get("components.querybuilder.actions.labels"),
    changeOperatorTo: intl.get(
      "components.querybuilder.actions.changeOperatorTo"
    ),
    delete: {
      title: intl.get("components.querybuilder.actions.delete.title"),
      cancel: intl.get("components.querybuilder.actions.delete.cancel"),
      confirm: intl.get("components.querybuilder.actions.delete.confirm"),
    },
    clear: {
      title: intl.get("components.querybuilder.actions.clear.title"),
      cancel: intl.get("components.querybuilder.actions.clear.cancel"),
      confirm: intl.get("components.querybuilder.actions.clear.confirm"),
      buttonTitle: intl.get(
        "components.querybuilder.actions.clear.buttonTitle"
      ),
      description: intl.get(
        "components.querybuilder.actions.clear.description"
      ),
    },
  },
});
