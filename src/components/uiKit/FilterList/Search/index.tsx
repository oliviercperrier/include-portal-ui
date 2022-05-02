import { useState } from 'react';
import SearchAutocomplete, {
  ISearchAutocomplete,
  OptionsType,
} from 'components/uiKit/FilterList/Search/SearchAutocomplete';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ArrangerApi } from 'services/api/arranger';
import { DocumentNode } from 'graphql';

interface IGlobalSearch<T> {
  query: DocumentNode;
  index: INDEXES;
  searchKey: string[];
  setCurrentOptions: (result: T[], search: string) => OptionsType[];
  searchValueTransformer?: (search: string) => string;
  onSelect: (values: string[]) => void;
}

type TGlobalSearch<T> = IGlobalSearch<T> &
  Omit<ISearchAutocomplete, 'onClose' | 'onSearch' | 'onSelect' | 'options'>;

const Search = <T,>({
  onSelect,
  query,
  index,
  searchKey,
  selectedItems = [],
  setCurrentOptions,
  searchValueTransformer,
  ...props
}: TGlobalSearch<T>) => {
  const [options, setOptions] = useState<OptionsType[]>([]);

  const handleSearch = async (search: string) => {
    const searchFilter = generateQuery({
      operator: BooleanOperators.or,
      newFilters: searchKey.map((key) =>
        generateValueFilter({
          field: key,
          value: [`${search}*`],
          index,
        }),
      ),
    });

    const { data } = await ArrangerApi.graphqlRequest<any>({
      query: query.loc?.source.body,
      variables: {
        sqon: {
          op: searchFilter.op,
          content: searchFilter.content,
        },
      },
    });

    setOptions(setCurrentOptions(data.data, search));
  };

  return (
    <SearchAutocomplete
      onSearch={(value) =>
        handleSearch(searchValueTransformer ? searchValueTransformer(value) : value)
      }
      onSelect={onSelect}
      options={options}
      selectedItems={selectedItems}
      {...props}
    />
  );
};

export default Search;
