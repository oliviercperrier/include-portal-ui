import { INDEXES } from 'graphql/constants';
import { FILE_SEARCH_BY_ID_QUERY } from 'graphql/files/queries';
import { IFileEntity } from 'graphql/files/models';
import useFileResolvedSqon from 'graphql/files/useFileResolvedSqon';
import { FileTextOutlined } from '@ant-design/icons';
import SelectItem from 'components/uiKit/select/SelectItem';
import GlobalSearch, { ICustomSearchProps } from 'components/uiKit/GlobalSearch';
import { highlightSearchMatch } from 'components/uiKit/GlobalSearch/utils';

const FileSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { sqon } = useFileResolvedSqon(queryBuilderId);

  return (
    <GlobalSearch<IFileEntity>
      queryBuilderId={queryBuilderId}
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
