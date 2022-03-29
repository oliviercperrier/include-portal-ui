import { ExperimentOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { SCROLL_WRAPPER_ID, TAB_IDS } from './utils/constants';
import intl from 'react-intl-universal';
import PageContent from './components/PageContent';
import { GraphqlBackend } from 'provider/types';
import ApolloProvider from 'provider/ApolloProvider';

import styles from './index.module.scss';

interface OwnProps {
  tab?: string;
}

const Variants = (props: OwnProps) => {
  const { tab } = useParams<{ tab: string }>(); // to sync filters with querybuilder
  //const variantMappingResults = useGetExtendedMappings('variant');

  const menuItems: ISidebarMenuItem[] = [
    {
      key: TAB_IDS.VARIANTS,
      title: intl.get('screen.variants.sidemenu.variant'),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: () => {},
    },
    {
      key: '2',
      title: intl.get('screen.variants.sidemenu.variant'),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: () => {},
    },
    {
      key: '3',
      title: intl.get('screen.variants.sidemenu.variant'),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: () => {},
    },
  ];

  return (
    <div className={styles.variantsLayout}>
      <SidebarMenu className={styles.sideMenu} menuItems={menuItems} />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <PageContent
          variantMapping={{
            data: [],
            loading: false,
          }}
          tabId={tab}
        />
      </ScrollContent>
    </div>
  );
};

const VariantWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <Variants {...props} />
  </ApolloProvider>
);

export default VariantWrapper;
