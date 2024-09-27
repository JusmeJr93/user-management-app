# AuthMaster - User Management App

## Project Overview

This is the frontend repo of **AuthMaster**, a full-stack user management system to manage user accounts through functionalities like registration, login, editing user profiles, and managing user roles. Admins can also block, unblock, and delete users.

You can check the Backend repo [here](https://github.com/JusmeJr93/user-management-backend).

## Key Features

- **User Registration**: New users can sign up by providing their name, email, and password, with backend validation for uniqueness.
- **User Login & Authentication:** Secure login system using JWT, where user tokens are stored in local storage for session management.
- **Dynamic & User Profile Pictures**: After login, a dynamic greeting shows the name of the logged-in user and display their previously upload profile picture or a default avatar.
- **Admin Controls:** Admins have elevated privileges, including the ability to promote/demote users to admin roles, reset passwords, and perform bulk actions.
- **Search Functionality**: Allowing the search through users by name or email.
- **Bulk User Actions**: dmins can block, unblock, or delete multiple users at once via bulk actions.
- **Responsive Design**: The interface is user-friendly, responsive and optimized for various screen sizes using Bootstrap and custom styling.

## Technologies Used

- **Vite**: Build tool for fast development.
- **React**: The core frontend framework.
- **React Router**: Handles client-side routing for a seamless single-page application experience.
- **Bootstrap & React-Bootstrap:** Responsive, reusable UI components, integrated with custom CSS for styling.
- **Axios**: For making HTTP requests to the backend API.
- **React Icons**: For icon set used throughout the UI.
- **CSS Custom Styles**: Additional styles for branding and enhanced user experience.

## Deployment

The app is deployed on Vercel. You can access it here: [AuthMaster by Junior Jusmé](https://authmaster-user-management.vercel.app/).
