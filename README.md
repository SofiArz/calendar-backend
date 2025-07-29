# Calendar Backend API

A robust RESTful API backend for a calendar application built with Node.js, Express, and MongoDB. This API provides complete CRUD operations for calendar events with user authentication and authorization.

## Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Event Management**: Full CRUD operations for calendar events
- **Data Validation**: Comprehensive input validation using express-validator
- **Security**: Password hashing with bcrypt, JWT token authentication
- **Database**: MongoDB with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error handling and validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd calendar-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=4000
   DB_CNN=mongodb://localhost:27017/calendar
   SECRET_JWT_SEED=your-secret-jwt-key-here
   ```

4. **Start the server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on port 4000 (or the port specified in your .env file).

## 📁 Project Structure

```
calendar-backend/
├── controllers/          # Request handlers
│   ├── auth.js         # Authentication controllers
│   └── events.js       # Event CRUD controllers
├── database/
│   └── config.js       # MongoDB connection configuration
├── helpers/
│   └── jwt.js          # JWT token generation utilities
├── middlewares/
│   ├── fields-validator.js  # Input validation middleware
│   └── jwt-validator.js     # JWT authentication middleware
├── models/
│   ├── event.js        # Event data model
│   └── user.js         # User data model
├── routes/
│   ├── auth.js         # Authentication routes
│   └── events.js       # Event management routes
├── public/             # Static files
│   ├── index.html
│   └── style.css
├── index.js            # Main application entry point
└── package.json
```

## 🔐 API Endpoints

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }
  ```
- **Response:**
  ```json
  {
    "ok": true,
    "uid": "user_id",
    "name": "John Doe",
    "token": "jwt_token"
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "Password123"
  }
  ```
- **Response:**
  ```json
  {
    "ok": true,
    "uid": "user_id",
    "name": "John Doe",
    "token": "jwt_token"
  }
  ```

#### Refresh Token
- **GET** `/api/auth/refresh`
- **Headers:** `x-token: jwt_token`
- **Response:**
  ```json
  {
    "ok": true,
    "uid": "user_id",
    "name": "John Doe",
    "token": "new_jwt_token"
  }
  ```

### Event Endpoints

All event endpoints require authentication. Include the JWT token in the request header: `x-token: your_jwt_token`

#### Get All Events
- **GET** `/api/events`
- **Headers:** `x-token: jwt_token`
- **Response:**
  ```json
  {
    "ok": true,
    "events": [
      {
        "id": "event_id",
        "title": "Meeting",
        "notes": "Team meeting",
        "start": "2024-01-15T10:00:00.000Z",
        "end": "2024-01-15T11:00:00.000Z",
        "user": {
          "id": "user_id",
          "name": "John Doe"
        }
      }
    ]
  }
  ```

#### Create Event
- **POST** `/api/events`
- **Headers:** `x-token: jwt_token`
- **Body:**
  ```json
  {
    "title": "Team Meeting",
    "notes": "Weekly team sync",
    "start": "2024-01-15T10:00:00.000Z",
    "end": "2024-01-15T11:00:00.000Z"
  }
  ```
- **Response:**
  ```json
  {
    "ok": true,
    "event": {
      "id": "event_id",
      "title": "Team Meeting",
      "notes": "Weekly team sync",
      "start": "2024-01-15T10:00:00.000Z",
      "end": "2024-01-15T11:00:00.000Z",
      "user": "user_id"
    }
  }
  ```

#### Update Event
- **PUT** `/api/events/:id`
- **Headers:** `x-token: jwt_token`
- **Body:**
  ```json
  {
    "title": "Updated Meeting",
    "notes": "Updated notes",
    "start": "2024-01-15T11:00:00.000Z",
    "end": "2024-01-15T12:00:00.000Z"
  }
  ```
- **Response:**
  ```json
  {
    "ok": true,
    "event": {
      "id": "event_id",
      "title": "Updated Meeting",
      "notes": "Updated notes",
      "start": "2024-01-15T11:00:00.000Z",
      "end": "2024-01-15T12:00:00.000Z",
      "user": "user_id"
    }
  }
  ```

#### Delete Event
- **DELETE** `/api/events/:id`
- **Headers:** `x-token: jwt_token`
- **Response:**
  ```json
  {
    "ok": true
  }
  ```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation for all inputs
- **Authorization**: Users can only modify their own events
- **CORS**: Cross-origin resource sharing enabled

## Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Event Model
```javascript
{
  title: String (required),
  notes: String (optional),
  start: Date (required),
  end: Date (required),
  user: ObjectId (required, references User)
}
```

## Validation Rules

### User Registration/Login
- **Name**: Required, non-empty
- **Email**: Required, valid email format
- **Password**: Minimum 8 characters, must include uppercase, lowercase, and number

### Event Creation/Update
- **Title**: Required, non-empty
- **Start Date**: Required, valid ISO 8601 date format
- **End Date**: Required, valid ISO 8601 date format, must be after start date

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "ok": false,
  "msg": "Error message",
  "errors": {} // Validation errors (if applicable)
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid token)
- `404`: Not Found
- `500`: Internal Server Error

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Scripts

- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server

