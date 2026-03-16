# 💬 Real-Time Chat Application

A full-stack real-time chat application that allows users to register, login, and exchange messages instantly. The system uses WebSockets to deliver messages in real time without refreshing the page.

---

## 🚀 Features

- 🔐 User authentication (Register & Login)
- ⚡ Real-time messaging via Socket.IO
- 🟢 Online user tracking
- 💾 Persistent chat history (MongoDB)
- 🔄 Instant UI updates with Redux
- 📱 Responsive chat interface

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| Redux Toolkit | State management |
| Axios | HTTP requests |
| Bootstrap | Styling & layout |
| Socket.IO Client | Real-time communication |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| Socket.IO | WebSocket server |
| JWT | Authentication tokens |
| bcrypt | Password hashing |

---

## 📁 Project Structure

```
chat-app/
├── client/                   # React frontend
│   ├── public/
│   └── src/
│       ├── components/       # UI components
│       │   ├── Home.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Mainbar.jsx
│       │   └── User.jsx
│       ├── features/         # Redux slices & thunks
│       │   ├── user/
│       │   ├── message/
│       │   └── socket/
│       ├── pages/            # Route-level pages
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       └── store.js
│
└── server/                   # Node.js backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── index.js
```

---

## ⚙️ Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
```

Start the backend server:

```bash
npm run dev
```

> Server will run on **http://localhost:3000**

---

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file inside the `client/` directory:

```env
REACT_APP_API_URL=http://localhost:3000
```

Start the React app:

```bash
npm start
```

> App will run on **http://localhost:3000**

---

## 🔌 Socket Events

| Event | Direction | Description |
|---|---|---|
| `connection` | Client → Server | User connects to socket |
| `onlineUsers` | Server → Client | Broadcasts list of online users |
| `message` | Server → Client | Delivers a new incoming message |
| `disconnect` | Client → Server | User disconnects from socket |

---

## 🔐 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login and receive JWT token |
| `POST` | `/logout` | Logout current user |

### User Routes — `/api/users`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Get all users (except current) |
| `GET` | `/:id` | Get user profile by ID |

### Message Routes — `/api/messages`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/:receiverId` | Get conversation with a user |
| `POST` | `/send/:receiverId` | Send a message to a user |

---


## 🧠 How It Works

1. **User registers/logs in** → JWT token is issued and stored
2. **Socket connection is initialized** with the user's ID on login
3. **Online users list** is broadcast to all connected clients via `onlineUsers` event
4. **Sending a message** triggers a REST API call to save it in MongoDB, then emits it via Socket.IO to the receiver in real time
5. **Redux store** keeps messages, selected user, and socket state in sync across components

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👨‍💻 Author

Built with ❤️ by YUVAN R(https://github.com/YUVAN-cse)

> ⭐ If you found this project helpful, please give it a star!
