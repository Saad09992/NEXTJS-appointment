# Appointment Management System

A full-stack appointment booking application built with Next.js as a
practice project for implementing authentication, appointment booking,
schedule management, and database-driven workflows.

## Overview

The application supports two types of users:

- **Normal users** can book appointments without logging in.
- **Administrators** can log in and create/manage appointment schedules.

The project was built as a personal practice project to gain hands-on
experience building a complete full-stack application with Next.js.

## Features

### Appointment Booking

- View available appointment slots
- Book an appointment
- Date-based appointment selection
- User-friendly appointment booking flow

### Admin

- Admin authentication
- Schedule creation
- Appointment schedule management

### Application

- Responsive UI
- Form validation
- Client-side state management
- API-based communication
- Database-backed application flow

## Tech Stack

### Frontend

- Next.js
- React
- JavaScript
- TailwindCSS
- React Datepicker
- Formik
- Yup
- Lucide React

### Backend / Data

- Next.js
- MongoDB
- Mongoose
- Axios

### Authentication

- JSON Web Tokens (JWT)
- bcrypt

### State Management

- Redux Toolkit
- React Redux

### Other

- Nodemailer

## Architecture

```text
                    ┌─────────────────────┐
                    │       Next.js       │
                    │    React Frontend   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Application / API   │
                    │       Logic         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │      Mongoose       │
                    └─────────────────────┘
```

## Project Structure

```text
NEXTJS-appointment/
│
├── public/
├── src/
├── .eslintrc.json
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.js
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Saad09992/NEXTJS-appointment.git
cd NEXTJS-appointment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and configure the required database,
authentication, and application settings.

Do not commit real credentials or secrets to the repository.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Application Flow

### Normal User

```text
Open Application
       ↓
View Booking Page
       ↓
Select Date / Time
       ↓
Submit Appointment
       ↓
Appointment Stored
```

### Administrator

```text
Admin Login
     ↓
Authentication
     ↓
Create Schedule
     ↓
Define Available Slots
     ↓
Users Can Book Available Slots
```

## Purpose

This project was created as a personal practice project to improve my
understanding of full-stack application development with Next.js.

The main areas I wanted to practice were:

- Authentication
- Database integration
- Appointment scheduling
- Form handling
- State management
- API communication
- Full-stack application structure

## Status

Personal practice project.

The project is intended as a learning and portfolio project rather than
a production appointment platform.
