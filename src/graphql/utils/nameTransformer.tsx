import { extractMondoTitleAndCode } from 'views/DataExploration/utils/helper';
import { Typography } from 'antd';

const { Text } = Typography;

export const transformNameIfNeeded = (field: string, name: string) => {
  if (field === 'diagnosis__mondo_id_diagnosis') {
    const mondo = extractMondoTitleAndCode(name);
    return (
      <Text>
        {mondo?.title} <Text type="secondary">(MONDO:{mondo?.code})</Text>
      </Text>
    );
  }
  return name;
};
