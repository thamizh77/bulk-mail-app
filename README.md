# Bulk Mail App

A complete MERN stack application for sending bulk emails with Nodemailer and storing every sending attempt in MongoDB.

## Features

- Admin login protected by JWT
- Send bulk email to comma-separated recipients
- Client-side and server-side validation
- Loading, success, and error states
- Email history table
- MongoDB `EmailHistory` schema
- REST API documentation
- Deployment notes for Vercel and Render

## Tech Stack

- Frontend: React.js, React Router, CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose, Nodemailer, JWT
- Database: MongoDB Atlas or local MongoDB

## Folder Structure

```text
bulk-mail-app/
├── client/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── README.md
```

## Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bulk-mail-app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:3000
```

Create `client/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Local Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Start MongoDB locally or create a MongoDB Atlas cluster.

3. Configure `server/.env` and `client/.env`.

4. Run both apps:

```bash
npm run dev
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:5000`

## Gmail SMTP Setup

For Gmail, enable 2-Step Verification and create an App Password. Use that app password as `EMAIL_PASS`. Do not use your normal Gmail password.

## API Documentation

Base URL:

```text
http://localhost:5000/api
```

### POST `/auth/login`

Authenticates the admin using `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

Request:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Success response:

```json
{
  "success": true,
  "message": "Login successful.",
  "token": "jwt-token"
}
```

### POST `/mail/send`

Sends a bulk email and stores the attempt in MongoDB.

Headers:

```text
Authorization: Bearer <jwt-token>
```

Request:

```json
{
  "subject": "Welcome",
  "body": "Hello team",
  "recipients": ["first@example.com", "second@example.com"]
}
```

Success response:

```json
{
  "success": true,
  "message": "Email sent successfully.",
  "data": {
    "id": "mongodb-document-id",
    "status": "success",
    "sentAt": "2026-06-01T10:00:00.000Z"
  }
}
```

Failure response:

```json
{
  "success": false,
  "message": "Email sending failed.",
  "error": "SMTP error message"
}
```

### GET `/mail/history`

Returns all email sending attempts.

Headers:

```text
Authorization: Bearer <jwt-token>
```

Success response:

```json
{
  "success": true,
  "data": [
    {
      "_id": "mongodb-document-id",
      "subject": "Welcome",
      "body": "Hello team",
      "recipients": ["first@example.com"],
      "status": "success",
      "sentAt": "2026-06-01T10:00:00.000Z"
    }
  ]
}
```

## MongoDB Schema

Collection name: `EmailHistory`

```js
{
  subject: String,
  body: String,
  recipients: [String],
  status: "success" | "failed",
  sentAt: Date,
  errorMessage: String
}
```

## Deployment

### Backend on Render

1. Push this project to GitHub.
2. Create a new Render Web Service.
3. Set root directory to `server`.
4. Build command:

```bash
npm install
```

5. Start command:

```bash
npm start
```

6. Add all backend environment variables in Render.
7. Set `CLIENT_URL` to your Vercel frontend URL.

### Frontend on Vercel

1. Import the GitHub repository in Vercel.
2. Set root directory to `client`.
3. Build command:

```bash
npm run build
```

4. Output directory:

```text
build
```

5. Add:

```env
REACT_APP_API_URL=https://your-render-backend.onrender.com/api
```

## Viva Questions and Answers

1. What is the MERN stack?
   MERN stands for MongoDB, Express.js, React.js, and Node.js. It is used to build full-stack JavaScript applications.

2. Why is Nodemailer used?
   Nodemailer is used in Node.js applications to send emails through SMTP or email service providers.

3. Why store email history?
   Email history helps track successful and failed attempts, recipients, status, and sent date for auditing and debugging.

4. What is JWT used for?
   JWT is used to protect routes by proving that the user has logged in successfully.

5. Why validate emails on both frontend and backend?
   Frontend validation improves user experience, while backend validation protects the API from invalid or malicious requests.

6. What is Mongoose?
   Mongoose is an ODM library that defines schemas and communicates with MongoDB from Node.js.

7. What are environment variables?
   Environment variables store configuration and secrets outside source code, such as database URLs and email passwords.

8. What is CORS?
   CORS controls which frontend domains are allowed to call the backend API from a browser.

9. Why use Express middleware?
   Middleware handles cross-cutting tasks such as authentication, JSON parsing, validation, and error handling.

10. How are failed email attempts handled?
    The backend catches the error, stores a failed history record, and returns a clear error response.

