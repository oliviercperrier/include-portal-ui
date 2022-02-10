import { IValueContent, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
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

const mapFilters = (
  sqonFilters: ISyntheticSqon,
  fieldPrefixMaps: IFieldPrefixMap[],
): ISyntheticSqon => {
  const sqonToMap = {
    ...sqonFilters,
  };

  const newContent = (sqonToMap.content || []).map((c) => {
    if (typeof c !== 'object') {
      return c;
    }

    const cc = c.content as IValueContent;
    return {
      ...c,
      content: {
        ...cc,
        field: `${getPrefix(cc, fieldPrefixMaps)}${cc.field}`,
      },
    };
  });

  sqonToMap.content = newContent;
  return sqonToMap;
};

export const mapFilterForParticipant = (sqonFilters: ISyntheticSqon) =>
  mapFilters(sqonFilters, [
    filePrefixMap,
    //biospecimenPrefixMap
  ]);

export const mapFilterForFiles = (sqonFilters: ISyntheticSqon) =>
  mapFilters(sqonFilters, [
    participantPrefixMap,
    //biospecimenPrefixMap
  ]);

export const mapFilterForBiospecimen = (sqonFilters: ISyntheticSqon) =>
  mapFilters(sqonFilters, [
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
