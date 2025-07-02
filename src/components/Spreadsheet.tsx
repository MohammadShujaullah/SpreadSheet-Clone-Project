 import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { RowData } from '../types';

type SpreadsheetProps = {
  data: RowData[];
  onUpdate: (index: number, key: keyof RowData, value: any) => void;
};

const Spreadsheet: React.FC<SpreadsheetProps> = ({ data, onUpdate }) => {
  const columns: Column<RowData>[] = useMemo(() => [
    {
      Header: 'Job Request',
      accessor: 'jobRequest',
      Cell: ({ row, value }) => (
        <input
          type="text"
          value={value}
          onChange={(e) => onUpdate(row.index, 'jobRequest', e.target.value)}
          className="bg-white border px-2 py-1 w-full rounded outline-none"
        />
      ),
    },
    {
      Header: 'Submitted',
      accessor: 'submitted',
      Cell: ({ row, value }) => (
        <input
          type="date"
          value={value}
          onChange={(e) => onUpdate(row.index, 'submitted', e.target.value)}
          className="bg-white border px-2 py-1 w-full rounded outline-none"
        />
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row, value }) => (
        <select
          value={value}
          onChange={(e) => onUpdate(row.index, 'status', e.target.value)}
          className={`w-full px-2 py-1 rounded border text-white font-medium ${
            value === 'Complete'
              ? 'bg-green-500'
              : value === 'In-process'
              ? 'bg-yellow-400'
              : value === 'Need to start'
              ? 'bg-blue-400'
              : value === 'Blocked'
              ? 'bg-red-500'
              : 'bg-gray-300'
          }`}
        >
          <option>In-process</option>
          <option>Need to start</option>
          <option>Complete</option>
          <option>Blocked</option>
        </select>
      ),
    },
    {
      Header: 'Submitter',
      accessor: 'submitter',
      Cell: ({ row, value }) => (
        <input
          type="text"
          value={value}
          onChange={(e) => onUpdate(row.index, 'submitter', e.target.value)}
          className="bg-white border px-2 py-1 w-full rounded outline-none"
        />
      ),
    },
    {
      Header: 'URL',
      accessor: 'url',
      Cell: ({ row, value }) => (
        <input
          type="text"
          value={value}
          onChange={(e) => onUpdate(row.index, 'url', e.target.value)}
          className="bg-white border px-2 py-1 w-full rounded outline-none"
        />
      ),
    },
    {
      Header: 'Assigned',
      accessor: 'assigned',
      Cell: ({ row, value }) => (
        <input
          type="text"
          value={value}
          onChange={(e) => onUpdate(row.index, 'assigned', e.target.value)}
          className="bg-white border px-2 py-1 w-full rounded outline-none"
        />
      ),
    },
    {
      Header: 'Priority',
      accessor: 'priority',
      Cell: ({ row, value }) => (
        <select
          value={value}
          onChange={(e) => onUpdate(row.index, 'priority', e.target.value)}
          className={`w-full px-2 py-1 rounded border font-semibold ${
            value === 'High'
              ? 'text-red-600'
              : value === 'Medium'
              ? 'text-yellow-600'
              : 'text-blue-600'
          }`}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      ),
    },
    {
      Header: 'Due Date',
      accessor: 'dueDate',
      Cell: ({ row, value }) => (
        <input
          type="date"
          value={value}
          onChange={(e) => onUpdate(row.index, 'dueDate', e.target.value)}
          className="bg-white border px-2 py-1 w-full rounded outline-none"
        />
      ),
    },
    {
      Header: 'Est. Value',
      accessor: 'estValue',
      Cell: ({ row, value }) => (
        <input
          type="number"
          value={value}
          onChange={(e) =>
            onUpdate(row.index, 'estValue', parseInt(e.target.value || '0'))
          }
          className="bg-white border px-2 py-1 w-full rounded outline-none"
        />
      ),
    },
  ], [onUpdate]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<RowData>({
    columns,
    data: data ?? [],
  });

  return (
    <div className="p-4">
      <table {...getTableProps()} className="min-w-full border bg-white">
        <thead className="bg-gray-100 text-gray-700">
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 text-left border-b"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                No matching records found.
              </td>
            </tr>
          ) : (
            rows.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map((cell: any) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 border-b text-sm"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
