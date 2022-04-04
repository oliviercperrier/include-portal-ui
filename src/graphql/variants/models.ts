import { ArrangerResultsTree } from 'graphql/models';

export interface IVariantResultTree {
  variant: ArrangerResultsTree<IVariantEntity>;
}

export interface IVariantEntity {
  id: string;
}

export type ITableVariantEntity = IVariantEntity & {
  key: string;
};
