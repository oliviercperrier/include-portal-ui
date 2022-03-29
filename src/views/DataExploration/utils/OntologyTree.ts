import { IPhenotypeSource } from 'graphql/summary/models';
import { capitalize } from 'lodash';

export type TreeNode = {
  title: string;
  key: string;
  hasChildren?: boolean;
  children: TreeNode[];
  results?: number;
  combinedResults?: number;
  exactTagCount?: number;
  hidden?: boolean;
  depth?: number;
  disabled?: boolean;
  value?: number; // for d3
  valueText: number; // required by d3 for displaying the value
  name: string | React.ReactElement;
};

export const lightTreeNodeConstructor = (key: string, children: TreeNode[] = []): TreeNode => {
  return {
    title: capitalize(key),
    key: key,
    children,
    valueText: 0,
    name: key,
  };
};

const termRegex = new RegExp('[^-]+$');

export const removeSameTerms = (selectedKeys: string[], targetKeys: string[]) => {
  let allSelectedAndChecked = {};

  selectedKeys.concat(targetKeys).forEach((t) => {
    allSelectedAndChecked = { ...allSelectedAndChecked, [`${t.match(termRegex)}`]: t };
  });

  return [...(Object.values(allSelectedAndChecked) as string[])];
};

export const getFlattenTree = (root: TreeNode) => {
  const transferDataSource: TreeNode[] = [];
  const flatten = (list: TreeNode[] = []) => {
    list.forEach((item) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  };

  if (root) {
    flatten([root]);
  }
  return transferDataSource;
};

export const searchTree = (element: TreeNode, matchingTitle: string): TreeNode | null => {
  if (element.title === matchingTitle) {
    return element;
  } else if (element.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingTitle);
    }
    return result;
  }
  return null;
};

export default class OntologyTree {
  phenotypes: IPhenotypeSource[] = [];
  tree: TreeNode | undefined = undefined;

  constructor(data: IPhenotypeSource[], field: string) {
    this.phenotypes = data;
    this.tree = this.generateTree(field);
  }

  private getChildrenValue = (childrenNodes: TreeNode[], sourceValue: number) =>
    childrenNodes.length
      ? childrenNodes.reduce((accumulator, n) => accumulator + (n.valueText || 0), 0)
      : sourceValue || 0;

  private populateNodeChild = (
    source: IPhenotypeSource,
    field: string,
    depth: number = 0,
    parentKey: string,
  ): TreeNode[] => {
    const nodes: TreeNode[] = [];
    this.phenotypes.forEach((phenotype: IPhenotypeSource) => {
      if (phenotype.top_hits.parents.includes(source.key)) {
        const childrenNodes = this.populateNodeChild(
          phenotype,
          field,
          depth + 1,
          `${parentKey}-${phenotype.key}`,
        );
        const node = this.createNodeFromSource(phenotype, childrenNodes, depth, parentKey);
        nodes.push(node);
      }
    });
    return nodes;
  };

  generateTree = (field: string) => {
    let rootNode: TreeNode | undefined = undefined;
    const workingPhenotypes = [...this.phenotypes];
    workingPhenotypes.forEach((sourcePhenotype) => {
      let phenotype: TreeNode;
      // start from root and then look for each element inhereting from that node
      if (!sourcePhenotype.top_hits.parents.length || workingPhenotypes.length === 1) {
        const children = this.populateNodeChild(sourcePhenotype, field, 1, sourcePhenotype.key);
        phenotype = this.createNodeFromSource(sourcePhenotype, children);
        phenotype.children = children;
        rootNode = phenotype;
      }
    });
    return rootNode;
  };

  createNodeFromSource = (
    source: IPhenotypeSource,
    children: TreeNode[] = [],
    depth: number = 0,
    parentKey?: string,
  ): TreeNode => {
    const value = this.getChildrenValue(children, source.doc_count);

    const result: TreeNode = {
      title: source.key,
      key: parentKey ? `${parentKey}-${source.key}` : source.key,
      children,
      results: source.doc_count,
      exactTagCount: source.filter_by_term?.doc_count || 0,
      name: capitalize(source.key),
      depth,
      disabled: false,
      valueText: value,
    };

    if (value < source.doc_count) {
      result.value = source.doc_count - value;
      result.valueText = source.doc_count;
    } else if (children.length === 0) {
      result.value = value;
    }
    return result;
  };
}
