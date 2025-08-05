# CRM System - Full Stack Application

## Overview
A comprehensive Customer Relationship Management (CRM) system built with React, TypeScript, Material-UI, FastAPI, and SQLAlchemy. Features responsive design, real-time data visualization, and full CRUD operations.

## Tech Stack
### Frontend
- React 18 with TypeScript
- Material-UI (MUI) for responsive UI components
- Chart.js with react-chartjs-2 for data visualization
- React Router for navigation
- Axios for API communication
- JSON Server for mock data

### Backend
- FastAPI (Python) for REST API
- SQLAlchemy for ORM and database management
- SQLite database
- Pydantic for data validation
- CORS middleware for frontend integration

## Project Structure
crm_bhatiyani/  
├── frontend/  
│   ├── src/  
│   │   ├── components/  
│   │   │   ├── Dashboard.tsx  
│   │   │   ├── ContactManager.tsx  
│   │   │   ├── Analytics.tsx  
│   │   │   └── Navigation.tsx  
│   ├── services/  
│   ├── types/  
│   └── App.tsx  
│   ├── db.json  
│   └── package.json  
├── backend/  
│   ├── main.py  
│   ├── models.py  
│   └── requirements.txt  
├── README.md  
└── prompts.md  

## Features
- ✅ Responsive dashboard with analytics  
- ✅ Contact management (Create, Read, Update, Delete)  
- ✅ Data visualization with Chart.js  
- ✅ Dual data sources (JSON Server + FastAPI)  
- ✅ Search and filter functionality  
- ✅ Mobile-responsive design  
- ✅ Real-time statistics  

## Installation & Setup

### Frontend
```bash
cd frontend
npm install
npm run dev  # Development server
json-server --watch db.json --port 3001  # Separate terminal
