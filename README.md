# Expense Tracker - Frontend

This is the frontend of the Expense Tracker application, built with **React** and deployed on **Netlify**.
It provides a simple and modern user interface to track expenses, manage profiles, and analyze spending.

## Live Demo

Link => https://imaginative-mochi-ae0588.netlify.app

## Features

- User authentication (login & register)
- Dashboard with expense table and filters
- Add, edit, and delete expenses
- Profile page with editable user info
- Responsive design with modern UI

## Tech Stack

- React
- React Router
- Axios
- React Query
- React Table
- Recharts
- Toastify
- React Context
- Sass (custom design system)

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/siva001v/Expense-Tracker-Web.git
   cd expense-tracker-frontend

   ```

2. Install dependencies

   ```bash
   npm install

   ```

3. Run the app locally
   ```bash
   npm run start
   ```

## API

This frontend connects to the Expense Tracker Backend => https://expense-tracker-server-mwa5.onrender.com

## Project Structure

expense-tracker-frontend/
│── src/
│ ├── assets/ # Images, icons
│ ├── api/ # Api constants
│ ├── components/ # Reusable UI components (Button, Filter, Header, etc..,)
│ ├── pages/ # Pages (Login, Register, Dashboard, Profile, etc.)
│ ├── services/ # API calls with axios
│ ├── context/ # Global state management (User name)
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # Helper functions
│ ├── App.jsx # Main app component
│ ├── index.jsx # Entry point
│── package.json
│── README.md
