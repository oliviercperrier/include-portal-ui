import { useState } from 'react';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import { IFilter, IFilterGroup } from '@ferlab/ui/core/components/filters/types';
import { getSelectedFilters, updateFilters } from '@ferlab/ui/core/data/filters/utils';
import { ExtendedMapping, ExtendedMappingResults, GqlResults } from 'graphql/models';
import { getFilterGroup, getFilters } from 'graphql/utils/Filters';
import { underscoreToDot } from '@ferlab/ui/core/data/arranger/formatting';
import CustomFilterSelector from './CustomFilterSelector';
import { getFiltersDictionary } from 'utils/translation';
import { TCustomFilterMapper } from '.';
import { useHistory } from "react-router-dom";

type OwnProps = {
  classname: string;
  index: string;
  cacheKey: string;
  filterKey: string;
  extendedMappingResults: ExtendedMappingResults;
  filtersOpen: boolean;
  filterMapper?: TCustomFilterMapper;
};

const CustomFilterContainer = ({
  classname,
  index,
  cacheKey,
  filterKey,
  filtersOpen,
  extendedMappingResults,
  filterMapper,
}: OwnProps) => {
  const history = useHistory();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [results, setResults] = useState<GqlResults<any>>();
  const found = (extendedMappingResults?.data || []).find(
    (f: ExtendedMapping) => f.field === underscoreToDot(filterKey),
  );

  const onChange = (fg: IFilterGroup, f: IFilter[]) => {
    updateFilters(history, fg, f, index);
  };

  const aggregations = results?.aggregations ? results?.aggregations[filterKey] : {};
  const filterGroup = getFilterGroup(found, aggregations, [], true);
  const filters = results?.data ? getFilters(results?.aggregations, filterKey) : [];
  const selectedFilters = results?.data ? getSelectedFilters(filters, filterGroup) : [];

  return (
    <div className={classname} key={`${filterKey}_${filtersOpen}`}>
      <FilterContainer
        maxShowing={5}
        isOpen={filtersOpen}
        filterGroup={filterGroup}
        filters={filters}
        onChange={() => {}}
        selectedFilters={selectedFilters}
        onSearchVisibleChange={setIsSearchVisible}
        customContent={
          <CustomFilterSelector
            index={index}
            cacheKey={cacheKey}
            filterKey={filterKey}
            dictionary={getFiltersDictionary()}
            filters={filters}
            filterGroup={filterGroup}
            maxShowing={5}
            onChange={onChange}
            selectedFilters={selectedFilters}
            searchInputVisible={isSearchVisible}
            onDataLoaded={setResults}
            extendedMappingResults={extendedMappingResults}
            filterMapper={filterMapper}
          />
        }
      />
    </div>
  );
};

export default CustomFilterContainer;
