import { updateActiveQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { findSqonValueByField, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import Search from 'components/uiKit/FilterList/Search';
import { OptionsType } from 'components/uiKit/FilterList/Search/SearchAutocomplete';
import { DocumentNode } from 'graphql';
import { INDEXES } from 'graphql/constants';
import { get, isEmpty } from 'lodash';

export interface ICustomSearchProps {
  queryBuilderId: string;
}

interface OwnProps<T> {
  queryBuilderId: string;
  title: string;
  placeholder: string;
  field: string;
  emptyDescription?: string;
  searchFields?: string[];
  index: INDEXES;
  query: DocumentNode;
  sqon: ISqonGroupFilter;
  optionsFormatter: (options: T[], matchRegex: RegExp, search: string) => OptionsType[];
}

const GlobalSearch = <T,>({
  queryBuilderId,
  title,
  placeholder,
  emptyDescription,
  field,
  searchFields,
  index,
  query,
  sqon,
  optionsFormatter,
}: OwnProps<T>) => (
  <Search<T>
    onSelect={(values) => {
      const sqonContent = isEmpty(values)
        ? []
        : [
            generateValueFilter({
              field,
              value: values,
              index,
            }),
          ];
      updateActiveQuery({
        queryBuilderId,
        field,
        sqonContent,
      });
    }}
    searchValueTransformer={(value) => value.toUpperCase()}
    index={index}
    emptyDescription={emptyDescription}
    placeHolder={placeholder}
    query={query}
    searchKey={searchFields ?? [field]}
    selectedItems={findSqonValueByField(field, sqon) as string[]}
    setCurrentOptions={(options, search) =>
      optionsFormatter(
        (get(options, `${index}.hits.edges`, []) as any[]).map(({ node }) => ({
          ...node,
        })),
        new RegExp(search.replace(/[-/\\^$*+?.()|[\]{}]/g, ''), 'gi'),
        search,
      )
    }
    title={title}
  />
);

export default GlobalSearch;
