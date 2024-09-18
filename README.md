# AuthMaster - User Management App

## Project Overview

This is the frontend repo of **AuthMaster**, a full-stack user management system to manage user accounts through actions such as registration, login, and updating user information. The app also features functionalities for editing, blocking, unblocking, and deleting users. This app was built with React on the frontend and Express with MySQL on the backend, showcasing various modern web development skills.

You can check the Backend repo [here](https://github.com/JusmeJr93/user-management-backend).

## Key Features

- **User Registration**: New Users can register by providing their name, email, and password.
- **User Login**: Users can log in using their email and password, and a token is stored in local storage to maintain authentication.
- **Dynamic Greeting**: After login, a dynamic greeting shows the name of the logged-in user.
- **Dashboard**: Users can view, search, block, unblock, edit, or delete users from the dashboard.
- **Token-Based Authentication**: JWT (JSON Web Token) is used to authenticate users and secure routes.
- **Search Functionality**: Allowing the search through users by name or email.
- **Bulk User Actions**: Users can select multiple users to block, unblock, or delete them in bulk.
- **Responsive Design**: The interface is user-friendly, responsive and optimized for various screen sizes using Bootstrap and custom styling.

## Technologies Used

- **Vite**: Build tool for fast development.
- **React**: The core frontend framework.
- **React Router**: For managing navigation within the application.
- **Bootstrap**: For responsive and reusable UI components.
- **React-Bootstrap**: Bootstrap components built specifically for React.
- **Axios**: For making HTTP requests to the backend API.
- **React Icons**: Icons used for buttons and other UI elements.
- **Heroku**: For the deployment of the NodeJs-ExpressJs backend with the JawsDB add-on for MySQL.
- **JWT (JSON Web Token)**: For secure authentication.
- **cors**: middleware package to handle CORS (Cross-Origin Resource Sharing).
- **CSS & Bootstrap**: For custom styles and layouts.

## Deployment

The app is deployed on Vercel. Check it out: [AuthMaster by Junior Jusmé](https://authmaster-user-management.vercel.app/).
