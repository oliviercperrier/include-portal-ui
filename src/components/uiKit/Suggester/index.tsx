import { useEffect, useState } from "react";
import { IFilter, VisualType } from "@ferlab/ui/core/components/filters/types";
import { updateFilters } from "@ferlab/ui/core/data/filters/utils";
import { AutoComplete, Input, notification, Spin } from "antd";
import { sendRequest } from "services/api";
import history from "utils/history";
import EnvironmentVariables from "helpers/EnvVariables";
import intl from "react-intl-universal";

import styles from "./index.module.scss";

const MIN_N_OF_CHARS_BEFORE_SEARCH = 2;

const MAX_N_OF_CHARS = 50;

export enum SUGGESTION_TYPES {
  PARTICIPANT = "participant",
  BIOSPECIMEN = "biospecimen",
  FILE = "file",
}

type Option = {
  value: string;
  meta: any;
};

type SuggesterProps = {
  suggestionType: SUGGESTION_TYPES;
  placeholderText: string;
  title: string;
};

const Suggester = ({ suggestionType, placeholderText }: SuggesterProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (
    userRawInput: string,
    suggestionType: SUGGESTION_TYPES
  ) => {
    if (userRawInput && userRawInput.length >= MIN_N_OF_CHARS_BEFORE_SEARCH) {
      setLoading(true);
      const { error } = await sendRequest({
        // TODO Add Type
        url: `${EnvironmentVariables.configFor(
          "ARRANGER_API"
        )}/${suggestionType}Feature/suggestions/${userRawInput}`,
      });

      if (error) {
        setError(true);
      } else {
        setOptions([{ value: "", meta: {} }]); // TODO Add options
      }

      setLoading(false);
    }
  };

  // Make the following function more generic
  const onSelectSuggestion = (featureType: string, displayType: string) => {
    let fg;
    if (featureType === "variant") {
      fg = {
        field: "locus",
        title: "",
        type: VisualType.Checkbox,
      };
    } else {
      fg = {
        field: "genes.symbol",
        title: "",
        type: VisualType.Checkbox,
      };
    }

    const f: IFilter[] = [
      {
        data: {
          count: 1,
          key: displayType,
        },
        name: "",
        id: displayType,
      },
    ];
    updateFilters(history, fg, f);
  };

  useEffect(() => {
    if (error) {
      notification.error({
        message: intl.get("components.suggester.error.title"),
        description: intl.get("components.suggester.error.description"),
        duration: 2.5,
        onClose: () => setError(false),
      });
    }
  }, [error]);

  return (
    <AutoComplete
      className={styles.suggesterInputAutoComplete}
      onSearch={(searchText) => handleSearch(searchText, suggestionType)}
      options={options}
      notFoundContent={
        loading ? <Spin /> : intl.get("components.suggester.noResultsFound")
      }
      filterOption={(inputValue, option) =>
        //  make sure we show suggestions for corresponding search only.
        (inputValue || "").trim() === option?.meta?.searchText
      }
      onSelect={(value: string, option: any) => {
        onSelectSuggestion(option.meta.featureType, option.meta.displayName);
      }}
      disabled={error}
    >
      <Input
        maxLength={MAX_N_OF_CHARS}
        allowClear
        size="middle"
        placeholder={placeholderText}
        onPressEnter={(e: any) => {
          e.preventDefault();
          const value = e.target.value;
          if (!value || !value.trim()) {
            setOptions([]);
          }
        }}
      />
    </AutoComplete>
  );
};

export default Suggester;
