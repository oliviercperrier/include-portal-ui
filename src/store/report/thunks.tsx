import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReportApi } from 'services/api/reports';
import { ReportConfig } from 'services/api/reports/models';
import { message, notification } from 'antd';
import intl from 'react-intl-universal';
import { TColumnStates } from '@ferlab/ui/core/components/ProTable/types';
import keycloak from 'auth/keycloak-api/keycloak';
import { v4 } from 'uuid';
import { sendRequest } from 'services/api';
import { ARRANGER_API_COLUMN_STATE_URL, ARRANGER_API_DOWNLOAD_URL } from 'provider/ApolloProvider';
import { getColumnStateQuery } from '../../graphql/reports/queries';
import { ArrangerColumnStateResults } from 'graphql/models';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import { getDefaultContentType } from 'common/downloader';
import { startCase } from 'lodash';

const showErrorReportNotif = () =>
  notification.error({
    message: intl.get('report.error.title'),
    description: (
      <div>
        {intl.get('report.error.message')}
        <a href="mailto:support@includedrc.org">{intl.get('report.error.support')}</a>
      </div>
    ),
    duration: 5,
  });

const fetchReport = createAsyncThunk<
  void,
  {
    data: ReportConfig;
    callback?: () => void;
  },
  { rejectValue: string }
>('report/generateReport', async (args, thunkAPI) => {
  try {
    message.loading({
      content: 'Please wait while we generate your report',
      key: 'report_pending',
      duration: 0,
    });
    await ReportApi.generateReport(args.data).then((_) => {
      message.destroy('report_pending');
      notification.success({
        message: intl.get('report.onSuccess.title'),
        description: intl.get('report.onSuccess.fetchReport'),
      });
    });
  } catch (e) {
    message.destroy('report_pending');
    showErrorReportNotif();
  }
});

const fetchTsvReport = createAsyncThunk<
  void,
  {
    index: string;
    columnStates: TColumnStates;
    sqon: any;
  },
  { rejectValue: string }
>('report/generate/tsv', async (args, thunkAPI) => {
  message.loading({
    content: 'Please wait while we generate your TSV report',
    key: 'report_pending',
    duration: 0,
  });

  const filename = `[include-${args.index}-table]-YYYY-MM-DD`;
  const formattedFileName = format(new Date(), `${filename}[.tsv]`);

  const { data, error } = await sendRequest<ArrangerColumnStateResults>({
    url: ARRANGER_API_COLUMN_STATE_URL,
    method: 'POST',
    data: {
      query: getColumnStateQuery(args.index),
      variables: {},
    },
  });

  if (error) {
    message.destroy('report_pending');
    showErrorReportNotif();
    return thunkAPI.rejectWithValue('error');
  }
  const columnKeyOrdered = [...args.columnStates]
    .sort((a, b) => a.index - b.index)
    .map(({ key }) => key);

  const tsvColumnsConfig = data!.data.file.columnsState.state.columns.filter(({ field }) =>
    args.columnStates.find(({ key }) => key === field),
  );
  const tsvColumnsConfigWithHeader = tsvColumnsConfig.map((column) => ({
    ...column,
    Header: startCase(column.field.replace(/\./g, ' ')),
  }));

  const params = new URLSearchParams({
    params: JSON.stringify({
      files: [
        {
          fileName: formattedFileName,
          fileType: 'tsv',
          sqon: args.sqon,
          index: args.index,
          columns: tsvColumnsConfigWithHeader.sort((a, b) => {
            return columnKeyOrdered.indexOf(a.field) > columnKeyOrdered.indexOf(b.field) ? 1 : -1;
          }),
        },
      ],
    }),
    httpHeaders: JSON.stringify({
      authorization: `Bearer ${keycloak.token}`,
    }),
    downloadKey: v4(),
  });

  const { data: fileData, error: downloadError } = await sendRequest<any>({
    url: ARRANGER_API_DOWNLOAD_URL,
    method: 'POST',
    data: params,
  });

  message.destroy('report_pending');

  if (downloadError) {
    showErrorReportNotif();
    return thunkAPI.rejectWithValue('error');
  }

  saveAs(
    new Blob([fileData], {
      type: getDefaultContentType('text'),
    }),
    formattedFileName,
  );
});

export { fetchReport, fetchTsvReport };
