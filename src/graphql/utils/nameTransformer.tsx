import {
  extractMondoTitleAndCode,
  extractPhenotypeTitleAndCode,
} from 'views/DataExploration/utils/helper';
import { Typography } from 'antd';

const { Text } = Typography;

export const transformNameIfNeeded = (field: string, name: string) => {
  if (field === 'mondo__name') {
    const mondo = extractMondoTitleAndCode(name);
    return (
      <Text>
        {mondo?.title} <Text type="secondary">(MONDO:{mondo?.code})</Text>
      </Text>
    );
  }
  if (field === 'observed_phenotype__name') {
    const mondo = extractPhenotypeTitleAndCode(name);
    return (
      <Text>
        {mondo?.title} <Text type="secondary">(HP:{mondo?.code})</Text>
      </Text>
    );
  }
  if (field === 'file_format') {
    return <span>{name.toLocaleLowerCase()}</span>;
  }
  return name;
};
