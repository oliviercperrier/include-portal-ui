const titleAndCodeExtractor = (value: string, codeSubstring: string) => {
  const indexCode = value.indexOf(codeSubstring);

  return {
    title: value.substring(0, indexCode).trim(),
    code: value.substring(indexCode + codeSubstring.length, value.length - 1),
  };
};

// Format is like: Sleep apnea (MONDO:0010535)
export const extractMondoTitleAndCode = (mondo: string) => titleAndCodeExtractor(mondo, "(MONDO:");

// Format is like: Alzheimer disease (HP:0002511)
export const extractPhenotypeTitleAndCode = (phenotype: string) => titleAndCodeExtractor(phenotype, "(HP:");

// Format is like: Feces (NCIT:C13234)
export const extractNcitTissueTitleAndCode = (ncit: string) => titleAndCodeExtractor(ncit, "(NCIT:");
