declare module 'react-table' {
  import {
    ReactNode,
    ComponentType,
    TableHTMLAttributes,
    HTMLProps,
  } from 'react';

  export interface TableOptions<D extends object> {
    columns: Array<Column<D>>;
    data: D[];
  }

  export interface Column<D extends object = {}> {
    Header: ReactNode | ((props: any) => ReactNode);
    accessor?: keyof D | ((row: D) => any);
    Cell?: (props: CellProps<D>) => ReactNode;
  }

  export interface CellProps<D extends object = {}> {
    row: Row<D>;
    value: any;
  }

  export interface Row<D extends object = {}> {
    index: number;
    cells: Array<Cell<D>>;
    getRowProps: () => Record<string, unknown>;
  }

  export interface Cell<D extends object = {}> {
    getCellProps: () => Record<string, unknown>;
    render: (type: 'Cell') => ReactNode;
  }

  export interface HeaderGroup<D extends object = {}> {
    headers: Array<Header<D>>;
    getHeaderGroupProps: () => Record<string, unknown>;
  }

  export interface Header<D extends object = {}> {
    render: (type: 'Header') => ReactNode;
    getHeaderProps: () => Record<string, unknown>;
  }

  export function useTable<D extends object>(
    options: TableOptions<D>
  ): {
    getTableProps: () => Record<string, unknown>;
    getTableBodyProps: () => Record<string, unknown>;
    headerGroups: Array<HeaderGroup<D>>;
    rows: Array<Row<D>>;
    prepareRow: (row: Row<D>) => void;
  };
}
