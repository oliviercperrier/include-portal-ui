import { INDEXES } from 'graphql/constants';
import { FILE_SEARCH_BY_ID_QUERY } from 'graphql/files/queries';
import GlobalSearch from '.';
import { IFileEntity } from 'graphql/files/models';
import useFileResolvedSqon from 'graphql/files/useFileResolvedSqon';
import { highlightSearchMatch } from './utils';
import { FileTextOutlined } from '@ant-design/icons';
import SelectItem from 'components/uiKit/select/SelectItem';

const FileSearch = () => {
  const { sqon } = useFileResolvedSqon();

  return (
    <GlobalSearch<IFileEntity>
      field="file_id"
      index={INDEXES.FILE}
      placeholder={'e.g. GF_001CSF26'}
      emptyDescription={'No files found'}
      query={FILE_SEARCH_BY_ID_QUERY}
      sqon={sqon}
      optionsFormatter={(options, matchRegex, search) =>
        options.map((option) => ({
          label: (
            <SelectItem
              icon={<FileTextOutlined />}
              title={highlightSearchMatch(option.file_id, matchRegex, search)}
            />
          ),
          value: option.file_id,
        }))
      }
      title={'Search by File ID'}
    />
  );
};

export default FileSearch;
