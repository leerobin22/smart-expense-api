# Smart Expense Backend API

A RESTful backend API for managing personal expenses.  
Users can register, authenticate, create expenses, track spending, and view spending summaries.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Express Validator

---

## Features

- User registration and login
- Secure JWT authentication
- Expense CRUD operations
- Input validation
- Spending summary analytics
- RESTful API structure

---

## Project Structure

```
src
│
├── controllers
│     ├── auth.controller.js
│     └── expense.controller.js
│
├── models
│     ├── user.model.js
│     └── expense.model.js
│
├── routes
│     ├── auth.routes.js
│     └── expense.routes.js
│
├── middleware
│     ├── auth.middleware.js
│     └── validate.middleware.js
│
├── validators
│     ├── auth.validator.js
│     └── expense.validator.js
│
├── config
│     └── db.js
│
├── constants
│     └── expense.constants.js
│
├── app.js
└── server.js
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/smart-expense-api.git
cd smart-expense-api
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

You may also copy the provided `.env.example` file.

---

## Authentication

This API uses **JWT authentication**.

After login, a token is returned.

Include the token in request headers:

```
Authorization: Bearer YOUR_TOKEN
```

---

## API Endpoints

### Authentication

#### Register User

```
POST /api/auth/register
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

#### Login

```
POST /api/auth/login
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

### User

#### Get Profile

```
GET /api/users/profile
```

Requires authentication.

---

### Expenses

#### Create Expense

```
POST /api/expenses
```

Request body:

```json
{
  "merchant": "Starbucks",
  "amount": 5.5,
  "category": "food",
  "date": "2026-03-01"
}
```

---

#### Get Expenses

```
GET /api/expenses
```

Optional query filters:

```
/api/expenses?startDate=2026-03-01&endDate=2026-03-31
/api/expenses?category=food
/api/expenses?page=1&limit=10
```

---

#### Update Expense

```
PUT /api/expenses/:id
```

---

#### Delete Expense

```
DELETE /api/expenses/:id
```

---

#### Expense Summary

```
GET /api/expenses/summary
```

Example response:

```json
{
  "totalSpent": 1200,
  "byCategory": [
    { "category": "food", "total": 400 },
    { "category": "transport", "total": 300 },
    { "category": "shopping", "total": 500 }
  ]
}
```

---

## Validation

Input validation is handled using **express-validator**.

Examples:

- Email format validation
- Required field checks
- Numeric validation for amount
- Enum validation for categories

---

## Security

- Passwords are hashed using **bcrypt**
- Protected routes require **JWT authentication**
- Users can only modify their own expenses
- Input validation prevents malformed requests

---

## Future Improvements

Possible enhancements:

- AI-powered receipt parsing
- Pagination for expense lists
- API logging
- Rate limiting
- Deployment to cloud services

---

## License

This project is for educational and portfolio purposes.