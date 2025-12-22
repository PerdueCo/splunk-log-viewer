import React, { useEffect, useState } from "react";

function App() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:3001/logs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch logs");
        return res.json();
      })
      .then((data) => setLogs(data))
      .catch((err) => setError(err.message));
  }, []);

  // Apply level + search filters
  const filteredLogs = logs.filter((log) => {
  const matchesLevel =
    levelFilter === "ALL" || log.level === levelFilter;

  const search = searchText.trim().toLowerCase();

  const searchableText = [
    log.timestamp,
    log.level,
    log.message
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const matchesSearch = searchableText.includes(search);

  return matchesLevel && matchesSearch;
});

const getRowStyle = (level) => {
  switch (level) {
    case "ERROR":
      return { backgroundColor: "#f8d7da" }; // light red
    case "WARN":
      return { backgroundColor: "#fff3cd" }; // light amber
    case "INFO":
      return { backgroundColor: "#d1e7dd" }; // light green
    default:
      return {};
  }
};


  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Splunk Log Viewer</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Controls */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Filter by Level:&nbsp;
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
          </select>
        </label>

        &nbsp;&nbsp;

        <label>
          Search:&nbsp;
          <input
            type="text"
            placeholder="Search message..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>
      </div>

      <p>
        Showing {filteredLogs.length} of {logs.length} logs
      </p>

      {/* Table */}
      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>Timestamp</th>
            <th>Level</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index} style={getRowStyle(log.level)}>
              <td>{log.timestamp}</td>
              <td>{log.level}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
