# CRM Lead Management System
A full-stack CRM (Customer Relationship Management) web application built for managing sales leads, tracking pipeline progress, adding notes, and viewing dashboard analytics.
This project was developed as part of a Full-Stack CRM Take-Home Assessment.

# Project Overview
The CRM application helps a small sales team manage potential customers and sales opportunities.

Users can:
- Login securely
- Create and manage leads
- Track lead progress through the sales pipeline
- Add notes after calls or meetings
- View dashboard statistics
- Search and filter leads

The application includes a frontend, backend API, database integration, authentication system, and responsive UI.

# Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Backend
- Node.js
- Express.js
- JWT Authentication

## Database
- MongoDB Atlas
- Mongoose

## Deployment
- Frontend: Vercel
- Backend: Render

# Features Implemented
## Authentication
- JWT-based login authentication
- Protected frontend routes
- Protected backend APIs
- User session stored in localStorage
- 
## Dashboard
Dashboard includes:
- Total Leads
- New Leads
- Qualified Leads
- Won Leads
- Lost Leads
- Total Estimated Deal Value
- Total Won Deal Value
- Pipeline summary
- Recent leads section
  
## Lead Management
Users can:
- Create leads
- View all leads
- Edit leads
- Delete leads
- View lead details
- Update lead status

Lead fields:
- Lead Name
- Company Name
- Email
- Phone Number
- Lead Source
- Assigned Salesperson
- Status
- Estimated Deal Value
- Created Date

## Lead Notes
Users can:
- Add notes to leads
- Delete notes
- View note timestamps

Each note includes:
- Note content
- Created by
- Created date

## Search & Filtering
Leads can be filtered by:
- Lead status
- Lead source
- Sales Person

Search is supported for:
- Lead name
- Company name
- Email

# Authentication Credentials
## Admin User
Email:

```txt
admin@example.com
```
Password
```txt
password123
```
## Normal User
Email:

```txt
user@example.com
```
Password
```txt
password123
```
# Environment Variables
## Backend .env
```txt
PORT=5000
MONGO_URI=mongodb+srv://virajithajayathilaka:virajithadilshan@cluster0.sz1ju3t.mongodb.net/crm_db?retryWrites=true&w=majority
JWT_SECRET=crm_secret_key_123
```
## Frontend .env.local
```txt
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
# Local Installation
## Clone Repository
```txt
git clone https://github.com/VirajithaDilsh/CRM_System
```
## Backend Setup
```txt
cd backend
```
###  Install dependencies:
```txt
npm install
```
### Run Backend
```txt
npm run dev
```
### Backend runs on:
```txt
http://localhost:5000
```
# Frontend Setup
```txt
cd frontend
```
### Install dependencies:
```txt
npm install
```
### Run frontend:
```txt
npm run dev
```
### Frontend runs on:
```txt
http://localhost:3000
```
#Database Setup
## This project uses MongoDB Atlas.
Steps:

#Create MongoDB Atlas cluster
-Create database user
-Add IP address access
-Copy MongoDB connection string
-Add connection string to backend .env

# API Endpoints
## Authentication
### Login
```txt
POST /api/auth/login
```
## Leads
### Get all leads
```txt
GET /api/leads
```
## Create lead
```txt
POST /api/leads
```
## Get lead by ID
```txt
GET /api/leads/:id
```

