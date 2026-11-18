import React from "react";
import { CSVLink } from "react-csv";
import { FiDownload } from "react-icons/fi";

export default function ExportButton({ data }) {
  if (!data || data.length === 0) {
    return (
      <button className="export-btn" disabled>
        <FiDownload /> No Data
      </button>
    );
  }

  const headers = [
    { label: "Date", key: "date" },
    { label: "Channel", key: "channel" },
    { label: "Spend", key: "spend" },
    { label: "Revenue", key: "revenue" },
    { label: "Customers", key: "customers" },
    { label: "CAC", key: "cac" },
    { label: "ROI", key: "roi" },
  ];

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={"analytics_report.csv"}
      className="export-btn"
    >
      <FiDownload /> Export Report
    </CSVLink>
  );
}

