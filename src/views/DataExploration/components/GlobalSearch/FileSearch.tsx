import { INDEXES } from 'graphql/constants';
import { FILE_SEARCH_BY_ID_QUERY } from 'graphql/files/queries';
import GlobalSearch from '.';
import { IFileEntity } from 'graphql/files/models';
import useFileResolvedSqon from 'graphql/files/useFileResolvedSqon';

const FileSearch = () => {
  const { sqon } = useFileResolvedSqon();

  return (
    <GlobalSearch<IFileEntity>
      field="file_id"
      index={INDEXES.FILE}
      placeholder={'Search'}
      emptyDescription={'No files found'}
      query={FILE_SEARCH_BY_ID_QUERY}
      sqon={sqon}
      optionsFormatter={(options) =>
        options.map((option) => ({
          label: option.file_id,
          value: option.file_id,
        }))
      }
      title={'Search by File ID'}
    />
  );
};

export default FileSearch;
