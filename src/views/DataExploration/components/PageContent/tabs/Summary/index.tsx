import DemographicsGraphCard from './DemographicGraphCard';
import DataCategoryGraphCard from './DataCategoryGraphCard';
import DataTypeGraphCard from './DataTypeGraphCard';
import SunburstGraphCard from './SunburstGraphCard';
import SortableGrid from '@ferlab/ui/core/layout/SortableGrid';
import { useDispatch } from 'react-redux';
import { updateUserConfig } from 'store/user/thunks';
import { useUser } from 'store/user';
import { orderCardIfNeeded } from 'views/DataExploration/utils/helper';
import cx from 'classnames';

import styles from './index.module.scss';

const SummaryTab = () => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  return (
    <SortableGrid
      onReorder={(ids) =>
        dispatch(
          updateUserConfig({
            data_exploration: {
              summary: {
                cards: {
                  order: ids,
                },
              },
            },
          }),
        )
      }
      items={orderCardIfNeeded(
        [
          {
            id: '1',
            lg: 24,
            xl: 12,
            component: <DemographicsGraphCard id="1" className={styles.summaryGrapCard} />,
          },
          {
            id: '2',
            lg: 24,
            xl: 12,
            component: (
              <SunburstGraphCard
                id="2"
                className={cx(styles.summaryGrapCard, styles.sunburstGraphCard)}
              />
            ),
          },
          {
            id: '3',
            lg: 24,
            xl: 12,
            component: <DataCategoryGraphCard id="3" className={styles.summaryGrapCard} />,
          },
          {
            id: '4',
            lg: 24,
            xl: 12,
            component: <DataTypeGraphCard id="4" className={styles.summaryGrapCard} />,
          },
        ],
        userInfo?.config.data_exploration?.summary?.cards?.order,
      )}
      gutter={[24, 24]}
    />
  );
};

export default SummaryTab;