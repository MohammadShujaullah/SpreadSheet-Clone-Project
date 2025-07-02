 // src/components/HeaderBar.tsx
import React from 'react';

type HeaderBarProps = {
  onAddRow: () => void;
  onToggleFilters: () => void; // ✅ NEW prop added
};

const HeaderBar: React.FC<HeaderBarProps> = ({ onAddRow, onToggleFilters }) => {
  const handleClick = (label: string) => {
    console.log(`[Toolbar] '${label}' button clicked`);
  };

  return (
    <div className="bg-gray-100 border-b px-4 py-2 text-sm">
      {/* Top breadcrumb + title */}
      <div className="flex justify-between items-center mb-1">
        <div className="text-xs text-gray-500 font-medium">
          <span className="bg-orange-500 text-white px-2 py-1 rounded mr-2 text-xs">Workspace</span>
          Folder 2 &gt; Spreadsheet 3
        </div>
        <div className="text-gray-600 font-semibold">Spreadsheet style</div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            className="px-3 py-1 border rounded text-gray-600 bg-white hover:bg-gray-50"
            onClick={() => handleClick('Tool bar')}
          >
            Tool bar
          </button>
          <button
            className="px-3 py-1 border rounded text-gray-600 bg-white hover:bg-gray-50"
            onClick={() => handleClick('Hide fields')}
          >
            Hide fields
          </button>
          <button
            className="px-3 py-1 border rounded text-gray-600 bg-white hover:bg-gray-50"
            onClick={() => handleClick('Sort')}
          >
            Sort
          </button>
          <button
            className="px-3 py-1 border rounded text-gray-600 bg-white hover:bg-gray-50"
            onClick={onToggleFilters} // ✅ real filter toggle
          >
            Filter
          </button>
          <button
            className="px-3 py-1 border rounded text-gray-600 bg-white hover:bg-gray-50"
            onClick={() => handleClick('View')}
          >
            View
          </button>

          <div className="ml-4 font-medium">📄 Q3 Financial Overview</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm"
            onClick={() => handleClick('Import')}
          >
            Import
          </button>
          <button
            className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm"
            onClick={() => handleClick('Export')}
          >
            Export
          </button>
          <button
            className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm"
            onClick={() => handleClick('Share')}
          >
            Share
          </button>
          <button
            className="ml-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            onClick={onAddRow}
          >
            + New Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
