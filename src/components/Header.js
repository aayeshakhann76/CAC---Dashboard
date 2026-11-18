import React from 'react';
import './Header.css';
import { FiDownload, FiBell, FiUser } from 'react-icons/fi';
import * as XLSX from "xlsx";

function Header({ title = "CAC Dashboard", data }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleExport = () => {
    if (!data) {
      alert("No data available to export!");
      return;
    }

    const safeNum = (x) =>
      typeof x === "number" && isFinite(x) ? +x.toFixed(2) : (x ?? "");

    // ---- Totals sheet (KPIs) ----
    let totalsSheet;
    if (data.totals && typeof data.totals === "object") {
      const totalsRows = Object.entries(data.totals).map(([k, v]) => ({
        Metric: k.toUpperCase(),
        Value: safeNum(v),
      }));
      totalsSheet = XLSX.utils.json_to_sheet(totalsRows);
    }

    // ---- Channels sheet ----
    const channels = Array.isArray(data.channels) ? data.channels : [];
    const channelRows = channels.map((ch) => ({
      Channel: ch.channel ?? "",
      Spend: safeNum(ch.spend),
      Customers: safeNum(ch.customers),
      CAC: safeNum(ch.cac),
      Revenue: safeNum(ch.revenue),
      ROI: safeNum(ch.roi),
      CLTV: safeNum(ch.cltv),
      // add more fields if you store them
    }));
    const channelsSheet = XLSX.utils.json_to_sheet(channelRows);

    // ---- Workbook & download ----
    const wb = XLSX.utils.book_new();
    if (totalsSheet) XLSX.utils.book_append_sheet(wb, totalsSheet, "Totals");
    XLSX.utils.book_append_sheet(wb, channelsSheet, "Channels");

    const now = new Date();
    const stamp = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
    XLSX.writeFile(wb, `campaign_report_${stamp}.xlsx`);
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="dashboard-title">{title}</h1>
      </div>

      <div className="header-right">
        <button className="export-btn" onClick={handleExport}>
          <FiDownload />
          Export Report
        </button>

        <button className="icon-btn">
          <FiBell />
        </button>

        <div className="profile-container">
          <button className="icon-btn">
            <FiUser/>
          </button>

          {currentUser && (
            <div className="profile-dropdown">
              <p>{currentUser.name}</p>
              <p>{currentUser.email}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
