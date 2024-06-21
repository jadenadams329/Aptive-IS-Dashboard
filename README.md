# Aptive IS Dashboard

## Overview

The Aptive IS Dashboard is a web application designed to manage and track user authentication, goals, leads, and sales. It consists of a React frontend and an Express + Sequelize backend. This README provides an overview of the key features of the project.

## Features

### User Authentication

- **Signup and Login**: Users can create an account and log in using their credentials.
- **JWT and CSRF Protection**: The application uses JSON Web Tokens (JWT) for secure authentication and Cross-Site Request Forgery (CSRF) protection to ensure secure data transactions.
- **Logout**: Users can securely log out of their accounts.

### User Authorization
- **Roles**: There are 3 roles in this application. Manager, Closer, and Setter. In it's current state this application is made mostly for the Closer role. The features below will show which roles can do what.

### Goals Management

- **Create Goals (Authorization: Closer only)**: Users can create new goals to track their progress.
- **View Goals (Authorization: Closer only)**: Users can view a list of their goals.
- **Update Goals (Authorization: Closer only)**: Users can update the details of their existing goals.
- **Delete Goals (Authorization: Closer only)**: Users can delete goals that are no longer relevant.

### Leads Management

- **Create Leads (Authorization: Manager or Setter)**: Users can add new leads to the system.
- **View Leads (Authorization: All roles)**: Users can view a list of their leads.
- **Update Leads (Authorization: All roles, specific fields)**: Users can update the information of their existing leads.
- **Delete Leads (Authorization: Manager only)**: Users can remove leads from the system.

### Sales Tracking

- **Record Sales (Authorization: Closer only)**: Users can record their sales activities. How to: User who is in a Closer role must first claim the lead on the Setter Transfer Page. Once the lead is claimed, the user must hit the edit button in the desired row then in the `Disposition` dropdown the user must select "Sold" then hit the save button. The new sale form will then open in a modal where the user can enter thier sale. 
- **View Sales (Authorization: Closer only)**: Users can view a list of their sales records.
- **Update Sales (Authorization: Closer only)**: Users can update the details of their sales records.
- **Delete Sales (Authorization: Closer only)**: Users can delete sales records.

### Frontend

- **React**: The frontend is built using React, providing a responsive and dynamic user interface.
- **Redux**: State management is handled using Redux, ensuring a predictable state container for the application.
- **Vite**: The project uses Vite for fast and efficient development and build processes.

### Backend

- **Express**: The backend is built using Express, providing a robust and scalable server-side framework.
- **Sequelize**: The application uses Sequelize ORM for database interactions, supporting various SQL databases.
- **API Routes**: The backend defines various API routes for handling user authentication, goals, leads, and sales operations.
- **Middleware**: The backend includes middleware for security, logging, and error handling.
