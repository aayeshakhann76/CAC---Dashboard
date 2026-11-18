// import React, { useEffect, useState, useCallback } from 'react';
// import './App.css';
// import './theme.css';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import KpiCards from './components/KpiCards';
// import Footer from './components/Footer';
// import Login from './components/Login';
// import SignUp from "./components/SignUp";
// import { auth } from './components/firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import DataUploadPage from './components/DataUploadPage';
// import CACBarChart from "./components/Charts";
// import SpendPieChart from "./components/SpendPieChart";
// import LineChart from "./components/LineChart";
// import Analytics from "./components/Analytics";

// import PredictiveAnalysis from "./components/PredictiveAnalysis";
// import FutureRevenueCard from "./components/FutureRevenueCard";



// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [activePage, setActivePage] = useState('dashboard');
//   const [campaignData, setCampaignData] = useState(null);
//   const [showSignUp, setShowSignUp] = useState(false);

//   // Fetch user-specific campaign data
//   const fetchCampaignData = useCallback((userEmail, isNewUser = false) => {
//     if (isNewUser) {
//       setCampaignData({
//         totals: { spend: 0, customers: 0, cac: 0, revenue: 0, roi: 0, cltv: 0 },
//         channels: []
//       });
//       return;
//     }

//     fetch(`http://127.0.0.1:5000/api/campaigns?user=${encodeURIComponent(userEmail)}`)
//       .then(res => res.json())
//       .then(data => setCampaignData(data))
//       .catch(err => console.error("Error fetching:", err));
//   }, []);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setLoggedIn(true);
//         const storedUser = { name: user.displayName || "", email: user.email };
//         localStorage.setItem("currentUser", JSON.stringify(storedUser));
//         fetchCampaignData(user.email);
//       } else {
//         setLoggedIn(false);
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [fetchCampaignData]);

//   if (loading) return <p>Loading...</p>;

//   if (!loggedIn) {
//     return showSignUp ? (
//       <SignUp
//         onSignUpSuccess={() => {
//           setLoggedIn(true);
//           const newUser = JSON.parse(localStorage.getItem("currentUser"));
//           fetchCampaignData(newUser.email, true);
//         }}
//         onSwitchToLogin={() => setShowSignUp(false)}
//       />
//     ) : (
//       <Login
//         onLogin={() => {
//           const existingUser = JSON.parse(localStorage.getItem("currentUser"));
//           fetchCampaignData(existingUser.email);
//           setLoggedIn(true);
//         }}
//         onSwitchToSignUp={() => setShowSignUp(true)}
//       />
//     );
//   }

//   return (
//     <div className="app-container">
//       <Sidebar activePage={activePage} onChangePage={setActivePage} />
//       <div className="main-content">
//         {activePage === 'dashboard' && (
//           <>
//             <Header title="CAC Dashboard" data={campaignData}/>
//             <div className="dashboard-body">
//               <KpiCards data={campaignData} />
//               <div className="chart-grid">
//                 <div className="chart-card">
//                   <h3>Customer Acquisition Cost by Channel</h3>
//                   <p>Compare CAC performance across marketing channels</p>
//                   <CACBarChart data={campaignData} />
//                 </div>
//                 <div className="chart-card">
//                   <h3>Marketing Spend Distribution</h3>
//                   <p>Total spend</p>
//                   <SpendPieChart data={campaignData} />
//                 </div>
//                 <div className="chart-card full-width">
//                   <h3>Revenue vs Spend</h3>
//                   <LineChart data={campaignData} />
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {activePage === 'upload' && (
//           <>
//             <Header title="Upload Data" data={campaignData} />
//             <section className="upload-section">
//               <DataUploadPage onDataUploaded={() => {
//                 const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//                 fetchCampaignData(currentUser.email);
//               }} />
//             </section>
//           </>
//         )}

//         {activePage === 'analytics' && (
//           <>
//             <Header title="Analytics" data={campaignData} />
//             <Analytics data={campaignData || []} />
//           </>
//         )}

//         {activePage === 'predictive' && (
//           <>
//             <Header title="Predictive Analytics" data={campaignData} />
//             <PredictiveAnalysis />
//           </>
//         )}

//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import './theme.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import KpiCards from './components/KpiCards';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from "./components/SignUp";
import { auth } from './components/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import DataUploadPage from './components/DataUploadPage';
import CACBarChart from "./components/Charts";
import SpendPieChart from "./components/SpendPieChart";
import LineChart from "./components/LineChart";
import Analytics from "./components/Analytics";

import PredictiveAnalysis from "./components/PredictiveAnalysis";
import FutureRevenueCard from "./components/FutureRevenueCard";

import Insights from "./components/Insights";



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [campaignData, setCampaignData] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  // Fetch user-specific campaign data
  const fetchCampaignData = useCallback((userEmail, isNewUser = false) => {
    if (isNewUser) {
      setCampaignData({
        totals: { spend: 0, customers: 0, cac: 0, revenue: 0, roi: 0, cltv: 0 },
        channels: []
      });
      return;
    }

    fetch(`http://127.0.0.1:5000/api/campaigns?user=${encodeURIComponent(userEmail)}`)
      .then(res => res.json())
      .then(data => setCampaignData(data))
      .catch(err => console.error("Error fetching:", err));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        const storedUser = { name: user.displayName || "", email: user.email };
        localStorage.setItem("currentUser", JSON.stringify(storedUser));
        fetchCampaignData(user.email);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [fetchCampaignData]);

  if (loading) return <p>Loading...</p>;

  if (!loggedIn) {
    return showSignUp ? (
      <SignUp
        onSignUpSuccess={() => {
          setLoggedIn(true);
          const newUser = JSON.parse(localStorage.getItem("currentUser"));
          fetchCampaignData(newUser.email, true);
        }}
        onSwitchToLogin={() => setShowSignUp(false)}
      />
    ) : (
      <Login
        onLogin={() => {
          const existingUser = JSON.parse(localStorage.getItem("currentUser"));
          fetchCampaignData(existingUser.email);
          setLoggedIn(true);
        }}
        onSwitchToSignUp={() => setShowSignUp(true)}
      />
    );
  }

  return (
    <div className="app-container">
      <Sidebar activePage={activePage} onChangePage={setActivePage} />
      <div className="main-content">
        {activePage === 'dashboard' && (
          <>
            <Header title="CAC Dashboard" data={campaignData}/>
            <div className="dashboard-body">
              <KpiCards data={campaignData} />
              <div className="chart-grid">
                <div className="chart-card">
                  <h3>Customer Acquisition Cost by Channel</h3>
                  <p>Compare CAC performance across marketing channels</p>
                  <CACBarChart data={campaignData} />
                </div>
                <div className="chart-card">
                  <h3>Marketing Spend Distribution</h3>
                  <p>Total spend</p>
                  <SpendPieChart data={campaignData} />
                </div>
                <div className="chart-card full-width">
                  <h3>Revenue vs Spend</h3>
                  <LineChart data={campaignData} />
                </div>
              </div>
            </div>
          </>
        )}

        {activePage === 'upload' && (
          <>
            <Header title="Upload Data" data={campaignData} />
            <section className="upload-section">
              <DataUploadPage onDataUploaded={() => {
                const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                fetchCampaignData(currentUser.email);
              }} />
            </section>
          </>
        )}

        {activePage === 'analytics' && (
          <>
            <Header title="Analytics" data={campaignData} />
            <Analytics data={campaignData || []} />
          </>
        )}

        {activePage === 'insights' && (
          <>
            <Header title="Insights" data={campaignData} />
            <Insights />
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;

