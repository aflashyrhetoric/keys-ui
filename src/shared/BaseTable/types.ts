// Types for BaseTable

// ************
// Carbon types
// ************

// NOTE: This is the shape of the `rows` values that CARBON provides as an argument in the render prop, not the shape of the `rowData` prop itself.
export interface TableRowShape {
  id: string;
  cells: any[];
}

export interface TableHeaderDataShape {
  id?: string;
  header: JSX.Element | Element | string;
  key: string;
  style?: any; // style object
  visible?: boolean;
}

export interface TableCellShape {
  id: string;
  value: any;
  info: {
    header: string;
  };
}
