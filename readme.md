# 🧭 SlotSwapper

A simple slot management and swapping system that allows users to create, manage, and swap event time slots with others.
This project is built with a TypeScript-based backend and a React frontend, focusing on the core functionality of scheduling and ownership transfer.

## 🚀 Live Demo

🔗 **[SlotSwapper Live](https://slotswapper-pvr4.onrender.com)**

📖 **[API Documentation](https://slotswapper-pvr4.onrender.com/api-doc)**

## 🛠️ Tech Stack

### Backend

- Node.js + Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Date-fns for time management

### Frontend

- React (Vite)
- TypeScript
- TailwindCSS + ShadCN UI
- Lucide Icons

## 📋 Features Implemented

✅ User Authentication (JWT-based)

✅ Event creation and viewing (with start/end times)

✅ Slot swapping between users

✅ Event filtering by date

✅ Responsive UI design

✅ Time conversion and localization (UTC handling)

✅ Swap request management

✅ Real-time notification system

## ⚙️ Implementation Notes

While developing the swap logic, I explored multiple edge cases:

- I initially considered swapping only the time slot, but realized it could create confusion if users wanted different event details.

- Therefore, I implemented it such that ownership of the event changes during a swap.

- If users wish, they can later edit the title or description after the swap.

- This approach keeps the backend logic simpler and makes the concept easier to extend later.

## 📚 API Documentation

For detailed API documentation, visit: **[API Docs](https://slotswapper-backend-ol2r.onrender.com/api-docs)**

### 🗓️ Event Routes

| Method   | Endpoint                              | Description                                     |
| -------- | ------------------------------------- | ----------------------------------------------- |
| `POST`   | `/api/events`                         | Create a new event                              |
| `GET`    | `/api/events`                         | Fetch all events for the logged-in user         |
| `GET`    | `/api/events/swappable`               | Fetch all swappable events (excluding your own) |
| `DELETE` | `/api/events/:eventId`                | Delete an event by ID                           |
| `PATCH`  | `/api/events/:eventId/status/:status` | Update the status of a specific event           |
| `PUT`    | `/api/events/:eventId`                | Update full event details                       |

### 🔁 Request Routes

| Method | Endpoint                           | Description                        |
| ------ | ---------------------------------- | ---------------------------------- |
| `POST` | `/api/requests`                    | Create a new swap request          |
| `GET`  | `/api/requests`                    | Get all incoming requests (to you) |
| `GET`  | `/api/requests/my-request`         | Get all requests sent by you       |
| `POST` | `/api/requests/:requestId/approve` | Approve a swap request             |
| `POST` | `/api/requests/:requestId/reject`  | Reject a swap request              |

### 🔐 Auth Routes

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| `POST` | `/api/auth/signup` | Register a new user     |
| `POST` | `/api/auth/login`  | Login and get JWT token |

## 🧩 Future Improvements

There are several features I couldn't implement fully due to an unexpected personal emergency (hospital visit) while I was out of town.
However, I plan to continue improving this project with:

🔁 Real-time updates via WebSocket

📄 Pagination and data optimization

🧠 Enhanced swap approval flow

🕐 Event reminders and notifications

📱 Improved mobile experience

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/silentvoice143/SlotSwapper.git
cd slotswapper
```

### 2. Backend setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Variables

Create a `.env` file in your backend root:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## 🚀 Getting Started

### Create an Account

1. Navigate to the sign-up page
2. Enter your email and password
3. Click "Sign Up"

### Create an Event

1. Go to the Events page
2. Click "Create Event"
3. Fill in event details (title, description, start time, end time)
4. Click "Create"

### Swap a Slot

1. Navigate to "Swappable Events"
2. Select an event you want to swap with
3. Click "Request Swap"
4. Wait for the event owner's approval

### Manage Requests

1. Go to "Swap Requests"
2. View incoming requests
3. Accept or Decline requests from other users

## 🧑‍💻 Author

Developed by: **Silent Voice**

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
