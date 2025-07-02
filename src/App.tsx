import React, { useState, useCallback, useMemo } from 'react';
import HeaderBar from './components/HeaderBar';
import Spreadsheet from './components/Spreadsheet';
import { RowData } from './types';



function App() {
  const [showFilters, setShowFilters] = useState(false); // ✅ This is required
  const [data, setData] = useState<RowData[]>([
    {
      id: 1,
      jobRequest: "Launch social media campaign",
      submitted: "2025-10-15",
      status: "In-process",
      submitter: "Aisha Patel",
      url: "https://example.com/campaign",
      assigned: "Sophie Choudhury",
      priority: "Medium",
      dueDate: "2024-11-20",
      estValue: 6200000
    },
    {
      id: 2,
      jobRequest: "Update press kit for redesign",
      submitted: "2025-10-28",
      status: "Need to start",
      submitter: "Irfan Khan",
      url: "https://example.com/redesign",
      assigned: "Tejas Pandey",
      priority: "High",
      dueDate: "2024-10-30",
      estValue: 3500000
    },
    {
      id: 3,
      jobRequest: "Optimize landing page conversions",
      submitted: "2025-11-02",
      status: "Complete",
      submitter: "Divya Rawat",
      url: "https://optimize.now/landing",
      assigned: "Ankit Mehta",
      priority: "Low",
      dueDate: "2024-11-10",
      estValue: 1800000
    },
    {
      id: 4,
      jobRequest: "Translate FAQ to French & German",
      submitted: "2025-10-22",
      status: "In-process",
      submitter: "Pierre Dubois",
      url: "https://faq.example.com",
      assigned: "Linda Schwartz",
      priority: "Medium",
      dueDate: "2024-11-05",
      estValue: 900000
    },
    {
      id: 5,
      jobRequest: "Prepare year-end summary video",
      submitted: "2025-11-03",
      status: "Blocked",
      submitter: "Anjali Joshi",
      url: "https://video-assets.cdn/video-brief",
      assigned: "Mohit Saini",
      priority: "High",
      dueDate: "2024-12-01",
      estValue: 7000000
    },
    {
      id: 6,
      jobRequest: "New brand guidelines presentation",
      submitted: "2025-11-01",
      status: "Complete",
      submitter: "Sarthak Jain",
      url: "https://brand.docs/presentation",
      assigned: "Saloni Sharma",
      priority: "Medium",
      dueDate: "2024-11-12",
      estValue: 1500000
    },
    {
      id: 7,
      jobRequest: "SEO audit for product pages",
      submitted: "2025-10-18",
      status: "In-process",
      submitter: "Ritika Sen",
      url: "https://seo.experttools.io/audit",
      assigned: "Ayush Srivastava",
      priority: "Low",
      dueDate: "2024-11-09",
      estValue: 400000
    },
    {
      id: 8,
      jobRequest: "Design mockups for new homepage",
      submitted: "2025-11-06",
      status: "Need to start",
      submitter: "Nitin Sharma",
      url: "https://design.mockups/final",
      assigned: "Preeti Narang",
      priority: "High",
      dueDate: "2024-11-25",
      estValue: 2800000
    }
  ]);

  // ✅ Filter states
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [submittedAfter, setSubmittedAfter] = useState("");

  // ✅ Apply filters using useMemo
  const filteredData = useMemo(() => {
    return data.filter(row => {
      const matchStatus = statusFilter === "All" || row.status === statusFilter;
      const matchPriority = priorityFilter === "All" || row.priority === priorityFilter;
      const matchDate =
        !submittedAfter || new Date(row.submitted) >= new Date(submittedAfter);

      return matchStatus && matchPriority && matchDate;
    });
  }, [data, statusFilter, priorityFilter, submittedAfter]);

  const handleAddRow = () => {
    const newRow: RowData = {
      id: data.length + 1,
      jobRequest: '',
      submitted: '',
      status: 'In-process',
      submitter: '',
      url: '',
      assigned: '',
      priority: 'Medium',
      dueDate: '',
      estValue: 0,
    };
    setData([...data, newRow]);
    console.log('New row added');
  };

  const handleUpdate = useCallback(
    <K extends keyof RowData>(index: number, key: K, value: RowData[K]) => {
      const updatedRow = { ...data[index], [key]: value };
      const newData = [...data];
      newData[index] = updatedRow;
      setData(newData);
    },
    [data]
  );

  return (
    <div className="h-screen bg-gray-100 text-gray-900 transition-colors duration-300">
      {/* UI-only Theme Toggle Switch (no dark mode, just logs) */}
      <div className="p-2 text-right">
        <button
          onClick={() => console.log("Theme toggle clicked")}
          className="relative inline-flex items-center h-8 w-16 rounded-full bg-gray-300"
        >
          <span className="inline-block w-6 h-6 transform translate-x-1 bg-white rounded-full transition-transform duration-300" />
          <span className="absolute left-1 text-xs text-yellow-600">🌞</span>
          <span className="absolute right-1 text-xs text-gray-800">🌙</span>
        </button>
      </div>

      {/* ✅ Filters Section */}
      <div className="flex flex-wrap gap-4 px-4 py-2 items-center text-sm">
        <label className="flex items-center gap-1">
          Status:
          <select
            className="px-2 py-1 border rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>In-process</option>
            <option>Complete</option>
            <option>Need to start</option>
            <option>Blocked</option>
          </select>
        </label>

        <label className="flex items-center gap-1">
          Priority:
          <select
            className="px-2 py-1 border rounded"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>

        <label className="flex items-center gap-1">
          Submitted after:
          <input
            type="date"
            className="px-2 py-1 border rounded"
            value={submittedAfter}
            onChange={(e) => setSubmittedAfter(e.target.value)}
          />
        </label>
      </div>

      {/* Spreadsheet */}
      <HeaderBar
        onAddRow={handleAddRow}
        onToggleFilters={() => setShowFilters(prev => !prev)} // ✅ Add this line
      />

      <Spreadsheet data={filteredData} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
