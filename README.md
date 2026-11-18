# CAC Dashboard – Marketing Campaign Analytics

A web-based analytics dashboard designed to monitor and analyse Customer Acquisition Cost (CAC), Customer Lifetime Value (CLTV), campaign performance, and Return on Investment (ROI).

The project helps businesses understand their marketing performance through interactive visualisations, data analysis, and predictive insights.



## Features

- **User Authentication:** Secure login and signup using Firebase Authentication.
- **Campaign Data Upload:** Upload marketing campaign data.
- **KPI Monitoring:** Track CAC, CLTV, customer count, revenue, and ROI.
- **Channel Performance Analysis:** Compare marketing channels based on their performance.
- **Interactive Visualisations:** Analyse campaign data through charts and graphs.
- **Predictive Analytics:** Explore predictive insights based on campaign data.
- **What-If Analysis:** Explore how changes in campaign inputs may affect performance.
- **Data Management:** Store and retrieve campaign data using SQLite.

## Technologies Used

| Frontend | Backend | Database & Tools |
|---|---|---|
| React.js | Python | SQLite |
| JavaScript | Flask | Firebase Authentication |
| CSS | REST API | Git & GitHub |
| Recharts | | |

## Project Structure

```text
cac-dashboard/
│
├── backend/
│   ├── app.py
│   ├── routes_predict.py
│   ├── db_config.py
│   └── ml_utils.py
│
├── public/
│
├── screenshots/
│   ├── dashboard.png
│   ├── analytics.png
│   └── predictive-analytics.png
│
├── src/
│   ├── components/
│   ├── App.js
│   └── index.js
│
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/aayeshakhann76/CAC---Dashboard.git
```

### 2. Navigate to the Project

```bash
cd CAC---Dashboard
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Start the React Frontend

```bash
npm start
```

The frontend will run at:

`http://localhost:3000`

### 5. Set Up the Python Backend

Open a new terminal:

```bash
cd backend
```

Install the Python dependencies:

```bash
py -m pip install -r requirements.txt
```

### 6. Start the Flask Server

```bash
py app.py
```

The backend will run at:

`http://127.0.0.1:5000`

## Database

The project uses SQLite to store campaign information, including marketing channels, campaign spend, customer acquisition, and customer lifetime value.

## Future Enhancements

- Advanced predictive analytics.
- Enhanced campaign performance reporting.
- Additional data visualisations.
- Improved user experience and dashboard functionality.

## Author

**Ayesha Khan**

GitHub: https://github.com/aayeshakhann76

#Dashboard Screenshot
![CAC Dashboard](screenshots/dashboard.png)