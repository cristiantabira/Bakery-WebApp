# Bakery-WebApp 🍰

A modern, full-stack web application designed to deliver an exceptional customer experience while providing bakery owners with an intuitive and powerful management platform.

## 🌟 Overview

Bakery-WebApp is a comprehensive e-commerce solution for bakeries, combining a beautiful customer-facing interface with robust administrative tools. Built with React and Node.js, this application streamlines the entire bakery operation—from product catalog management to order processing and customer engagement.

## ✨ Key Features

### For Customers

-   **🛍️ Online Shop** - Browse and search through a beautifully designed product catalog
-   **🛒 Shopping Cart** - Seamless cart management with quantity controls
-   **👤 User Accounts** - Create accounts to track orders and manage preferences
-   **📦 Order History** - View past orders and track order status
-   **🗺️ Cultural Map** - Explore Romanian traditional recipes and regional specialties
-   **💳 Secure Checkout** - Streamlined checkout process for a smooth purchasing experience

### For Administrators

-   **📦 Product Management** - Add, edit, and delete products with image uploads
-   **👥 User Management** - Manage user accounts and assign admin privileges
-   **📊 Order Management** - Track and process customer orders efficiently
-   **🔐 Role-Based Access** - Secure admin panel with role-based permissions
-   **📝 Recipe Management** - Showcase traditional Romanian recipes

## 🛠️ Tech Stack

### Frontend

-   **React** - Modern UI library for building interactive interfaces
-   **React Router** - Client-side routing
-   **Bootstrap** - Responsive design framework
-   **Axios** - HTTP client for API communication

### Backend

-   **Node.js** - JavaScript runtime environment
-   **Express** - Web application framework
-   **Sequelize** - SQL ORM for database management
-   **SQLite** - Lightweight database for development
-   **JWT** - Secure authentication with JSON Web Tokens
-   **Multer** - File upload handling for product images

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/cristiantabira/Bakery-WebApp.git
cd Bakery-WebApp
```

2. Install server dependencies

```bash
cd server
npm install
```

3. Install client dependencies

```bash
cd ../client
npm install
```

4. Start the development server

```bash
# In the server directory
npm start

# In the client directory (new terminal)
npm start
```

The application will be available at `http://localhost:3000` (client) and `http://localhost:5000` (server).

## 📁 Project Structure

```
Bakery-WebApp/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services and context
│   │   └── styles/         # CSS stylesheets
│   └── public/             # Static assets
├── server/                 # Node.js backend application
│   ├── controllers/        # Request handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── uploads/            # Uploaded product images
└── README.md
```

## 🔐 Authentication

The application uses JWT-based authentication with secure HTTP-only cookies. Users can:

-   Register new accounts
-   Login with email and password
-   Access protected routes based on authentication status
-   Admins have additional privileges for managing products and users

## 🎨 Design Features

-   **Responsive Design** - Fully responsive layout that works on all devices
-   **Modern UI** - Clean, intuitive interface with smooth animations
-   **Mobile-Friendly** - Optimized mobile menu with hamburger navigation
-   **Accessible** - User-friendly design following best practices

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

**Cristian Tabira**

---

Made with ❤️ for bakeries everywhere
