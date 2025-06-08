# MERN Blog

A full-stack blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project allows users to create, read, update, and delete blog posts, with user authentication to secure content creation and management.

[Live website link](https://first-blog-obk8.onrender.com)

## 🚀 Features

- User authentication (signup, login, logout)
- Create, read, update, and delete blog posts
- Responsive design for various devices
- RESTful API for backend services
- MongoDB for data storage

## 🛠️ Technologies Used

**Frontend:**
- React.js
- Redux for state management
- React Router for navigation

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB

**Authentication:**
- JSON Web Tokens (JWT)

**Styling:**
- Tailwind CSS

## 📦 Installation Instructions

### 1. Clone the repository

```bash
git clone https://github.com/GODWIN-projects/mern-blog.git
cd mern-blog
```

### 2. Install dependencies for both frontend and backend

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Set up environment variables

- Create a `.env` file in the `backend` directory.
- Add the following variables:

```env
MONGO=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
```

- Replace `your_mongo_db_connection_string` with your MongoDB connection string.
- Replace `your_jwt_secret_key` with a secure secret key for JWT.

> 💡 Ensure MongoDB is running locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/atlas).

## 💻 Usage

### Start the backend server

```bash
cd backend
npm start
```

### Start the frontend development server

```bash
cd frontend
npm start
```

Open your browser and navigate to `http://localhost:3000` to view the application.

## 🌍 Environment Variables

- `MONGO`: The connection string for your MongoDB database.
- `JWT_SECRET`: A secret key used for signing and verifying JWT tokens.

