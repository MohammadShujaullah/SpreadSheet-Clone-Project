import React from 'react';

type ToolbarProps = {
  onAddRow: () => void;
};

const Toolbar: React.FC<ToolbarProps> = ({ onAddRow }) => {
  const handleClick = (label: string) => {
    console.log(`${label} button clicked`);
  };

  return (
    <div className="flex gap-4 bg-white p-4 shadow-md border-b">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onAddRow}
      >
        + Add Row
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => handleClick('Export')}
      >
        Export
      </button>
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        onClick={() => handleClick('Settings')}
      >
        Settings
      </button>
    </div>
  );
};

export default Toolbar;
