import {
  IValueContent,
  ISyntheticSqon,
  ISqonGroupFilter,
  TSqonContent,
  IValueFilter,
} from '@ferlab/ui/core/data/sqon/types';
import { isBooleanOperator, isEmptySqon } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { ExtendedMapping, ExtendedMappingResults } from 'graphql/models';

interface IFieldPrefixMap {
  index: string;
  prefix: string;
}

const filePrefixMap: IFieldPrefixMap = {
  index: INDEXES.FILE,
  prefix: 'files.',
};

const participantPrefixMap: IFieldPrefixMap = {
  index: INDEXES.PARTICIPANT,
  prefix: 'participants.',
};

//const biospecimenPrefixMap: IFieldPrefixMap = {
//  index: INDEXES.BIOSPECIMEN,
//  prefix: "biospecimen.",
//};

const getPrefix = (field: IValueContent, fieldPrefixMaps: IFieldPrefixMap[]) => {
  const fieldPrefixMap = fieldPrefixMaps.find((config) => config.index === field.index);
  return fieldPrefixMap ? fieldPrefixMap.prefix : '';
};

const recursiveMap = (
  sqon: ISqonGroupFilter | IValueFilter,
  fieldPrefixMaps: IFieldPrefixMap[],
): ISqonGroupFilter => {
  if (isEmptySqon(sqon as ISyntheticSqon)) {
    return sqon as ISqonGroupFilter;
  }

  const getNewContent = (sqon: ISqonGroupFilter): TSqonContent =>
    sqon.content.map((c: any) => recursiveMap(c, fieldPrefixMaps));

  if (isBooleanOperator(sqon)) {
    return Object.assign({
      content: getNewContent(sqon as ISqonGroupFilter),
      op: sqon.op,
    });
  }

  const valueSqon = sqon as IValueFilter;

  return Object.assign({
    content: {
      ...valueSqon.content,
      field: `${getPrefix(valueSqon.content, fieldPrefixMaps)}${valueSqon.content.field}`,
    },
    op: sqon.op,
  });
};

export const mapFilterForParticipant = (sqonFilters: ISqonGroupFilter) =>
  recursiveMap(sqonFilters, [
    filePrefixMap,
    //biospecimenPrefixMap
  ]);

export const mapFilterForFiles = (sqonFilters: ISqonGroupFilter) =>
  recursiveMap(sqonFilters, [
    participantPrefixMap,
    //biospecimenPrefixMap
  ]);

export const mapFilterForBiospecimen = (sqonFilters: ISqonGroupFilter) =>
  recursiveMap(sqonFilters, [
    filePrefixMap,
    {
      // Biospecimen only 1 participant so no 's'
      index: INDEXES.PARTICIPANT,
      prefix: 'participant.',
    },
  ]);

export const combineExtendedMappings = (mappings: ExtendedMappingResults[]) => {
  let concatMappings: ExtendedMapping[] = [];
  mappings.forEach((mapping) => {
    concatMappings = concatMappings.concat(mapping.data);
  });

  return {
    loading: false,
    data: concatMappings,
  };
};
