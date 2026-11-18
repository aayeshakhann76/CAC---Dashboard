// import React from 'react';
// import { FiHome, FiBarChart2, FiUpload,  FiLogOut, FiActivity } from 'react-icons/fi';
// import './Sidebar.css';
// import { auth } from './firebase';  
// import { signOut } from 'firebase/auth';

// const KPI_CARDS = [
//   { label: "CAC", value: "₹0"},
//   { label: "Total Spend", value: "₹0"},
//   { label: "Customer Acquired", value: "₹0"},
//   { label: "CLTV", value: "₹0"

//   },
// ];

// export default function Sidebar({activePage, onChangePage}) {

//   const handleLogout = (e) => {
//     e.preventDefault();  
//     signOut(auth)
//       .then(() => {
//         console.log("User signed out");
//       })
//       .catch((error) => {
//         console.error("Logout failed:", error);
//       });
//   };


//   return (
//     <div className="sidebar">
//       {/* Logo / Brand */}
//       {/* <div className="sidebar-header">
//         <h2 className="logo">CAC</h2> 
//       </div> */}

//       {/* Navigation */}
//       <nav className="sidebar-nav">
//         <a
//           href="#"
//           className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
//           onClick={e => {
//             e.preventDefault();
//             onChangePage('dashboard');
//           }}
//         >
//           <FiHome />
//           Dashboard
//         </a>

//         <a
//           href="#"
//           className={`nav-item ${activePage === 'analytics' ? 'active' : ''}`}
//           onClick={e => {
//             e.preventDefault();
//             onChangePage('analytics');
//           }}
//         >
//           <FiBarChart2 />
//           Analytics
//         </a>

//         <a
//           href="#"
//           className={`nav-item ${activePage === 'upload' ? 'active' : ''}`}
//           onClick={e => {
//             e.preventDefault();
//             onChangePage('upload');
//           }}
//         >
//           <FiUpload />
//           Upload Data
//         </a>
      
//          {/* ✅ Predictive Analytics (Settings ki jagah) */}
//         <a
//           href="#"
//           className={`nav-item ${activePage === 'predictive' ? 'active' : ''}`}
//           onClick={e => {
//             e.preventDefault();
//             onChangePage('predictive');
//           }}
//         >
//           <FiActivity />
//           Predictive Analytics
//         </a>
//       </nav>

//       <div className="sidebar-footer">
//         <button className="nav-item logout" onClick={handleLogout} type="button">
//           <FiLogOut />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { FiHome, FiBarChart2, FiUpload, FiLogOut, FiActivity } from 'react-icons/fi';
import './Sidebar.css';
import { auth } from './firebase';  
import { signOut } from 'firebase/auth';

const KPI_CARDS = [
  { label: "CAC", value: "₹0"},
  { label: "Total Spend", value: "₹0"},
  { label: "Customer Acquired", value: "₹0"},
  { label: "CLTV", value: "₹0" }
];

export default function Sidebar({activePage, onChangePage}) {

  const handleLogout = (e) => {
    e.preventDefault();  
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className="sidebar">
      {/* Logo / Brand */}
      {/* <div className="sidebar-header">
        <h2 className="logo">CAC</h2> 
      </div> */}

      {/* Navigation */}
      <nav className="sidebar-nav">
        <a
          href="#"
          className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
          onClick={e => {
            e.preventDefault();
            onChangePage('dashboard');
          }}
        >
          <FiHome />
          Dashboard
        </a>

        <a
          href="#"
          className={`nav-item ${activePage === 'analytics' ? 'active' : ''}`}
          onClick={e => {
            e.preventDefault();
            onChangePage('analytics');
          }}
        >
          <FiBarChart2 />
          Analytics
        </a>

        <a
          href="#"
          className={`nav-item ${activePage === 'upload' ? 'active' : ''}`}
          onClick={e => {
            e.preventDefault();
            onChangePage('upload');
          }}
        >
          <FiUpload />
          Upload Data
        </a>

        {/* ✅ Insights (Replaced Predictive Analytics) */}
        <a
          href="#"
          className={`nav-item ${activePage === 'insights' ? 'active' : ''}`}
          onClick={e => {
            e.preventDefault();
            onChangePage('insights');
          }}
        >
          <FiActivity />
          Insights
        </a>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout" onClick={handleLogout} type="button">
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
}
