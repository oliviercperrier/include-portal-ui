import { IValueContent, ISyntheticSqon } from "@ferlab/ui/core/data/sqon/types";
import { ExtendedMapping, ExtendedMappingResults } from "graphql/models";

interface IFieldPrefixMap {
  fields: string[];
  prefix: string;
}

const getPrefix = (field: string, fieldPrefixMaps: IFieldPrefixMap[]) => {
  const fieldPrefixMap = fieldPrefixMaps.find((config) =>
    config.fields.includes(field)
  );
  return fieldPrefixMap ? fieldPrefixMap.prefix : "";
};

const mapFilters = (
  sqonFilters: ISyntheticSqon,
  fieldPrefixMaps: IFieldPrefixMap[]
): ISyntheticSqon => {
  const sqonToMap = {
    ...sqonFilters,
  };

  const newContent = sqonToMap.content.map((c) => {
    if (typeof c !== "object") {
      return c;
    }

    const cc = c.content as IValueContent;
    return {
      ...c,
      content: {
        ...cc,
        field: `${getPrefix(cc.field, fieldPrefixMaps)}${cc.field}`,
      },
    };
  });

  sqonToMap.content = newContent;
  return sqonToMap;
};

export const mapFilterForParticipant = (
  sqonFilters: ISyntheticSqon,
  fileMapping: ExtendedMappingResults,
  bispecimenMapping: ExtendedMappingResults
) =>
  mapFilters(sqonFilters, [
    {
      fields: fileMapping.data.map((item) => item.field),
      prefix: "files.",
    },
    //{
    //  fields: bispecimenMapping.data.map((item) => item.field),
    //  prefix: "biospecimen."
    //}
  ]);

export const mapFilterForFiles = (
  sqonFilters: ISyntheticSqon,
  bispecimenMapping: ExtendedMappingResults,
  participantMapping: ExtendedMappingResults
) =>
  mapFilters(sqonFilters, [
    {
      fields: participantMapping.data.map((item) => item.field),
      prefix: "participant.",
    },
    //{
    //  fields: bispecimenMapping.data.map((item) => item.field),
    //  prefix: "biospecimen."
    //}
  ]);

export const mapFilterForBiospecimen = (
  sqonFilters: ISyntheticSqon,
  fileMapping: ExtendedMappingResults,
  participantMapping: ExtendedMappingResults
) =>
  mapFilters(sqonFilters, [
    {
      fields: fileMapping.data.map((item) => item.field),
      prefix: "files.",
    },
    {
      fields: participantMapping.data.map((item) => item.field),
      prefix: "participant.",
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
