# technical-assessment
A simple full-stack authentication app with NestJS for the backend and React for the frontend. It allows users to Signup, Signin, and access a Dashboard page.
Tech Stack
Backend: NestJS, PostgreSQL, TypeORM
Frontend: React, Axios
Database: PostgreSQL

Features
Signup: Register a new user with name, email, password, and organization.
Signin: Login with email and password.
Dashboard: A protected page that displays user details after successful login.

Setup
1. Backend Setup (NestJS)
Clone the repo and install dependencies:


cd backend
npm install
npm run start
The backend will run on http://localhost:3000.

Run the NestJS server:

2. Frontend Setup (React)
cd frontend
npm install

npm start

The frontend will run on http://localhost:3001.

API Endpoints
Health Check: GET /health
Signup: POST /users/signup
Signin: POST /users/signin
Dashboard: GET /users/dashboard (requires JWT token)

Testing
Use Postman to test the API endpoints.
Use the React app for the UI to sign up, sign in, and view the dashboard.
