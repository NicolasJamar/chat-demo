# 💬 Chat Application Demo with HTML/CSS and Socket.IO

This repository showcases a real-time chat application built using **Vanilla JavaScript** and **Socket.IO** for real-time bidirectional communication between clients and servers. This project was created as a demonstration for **Becode** and serves as a simpler alternative to the React version.

---

## 🚀 Features

- **Real-time Communication**: Instant messaging between users using WebSockets.
- **Simple Frontend**: Built with plain HTML, CSS, and JavaScript for quick prototyping.
- **Node.js Backend**: A lightweight server powered by Node.js and Express.
- **Socket.IO Integration**: Efficient and robust event-based communication layer.

---

## 🧰 Technologies Used

- **Frontend**:
  - HTML5
  - CSS3
  - Vanilla JavaScript

- **Backend**:
  - Node.js
  - Express
  - Socket.IO

---

## 📁 Project Structure

```bash
chat-demo/
├── public/         # Static frontend files (HTML/CSS/JS)
└── server.js       # Express and Socket.IO backend server
```

## ✅ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

## 🛠️ Installation

1. **Clone the Repository**:
   
```bash
git clone https://github.com/NicolasJamar/chat-demo.git
```

3. **Navigate to the Project Directory**:

```bash
cd chat-demo
```
5. **Install Dependencies**:
```bash
npm install
```

## ▶️ Running the Application
1.**Start the Server**:

```bash
npm run dev
```
The server will run on `http://localhost:3500`.

## 📦 Usage
- Open multiple browser tabs or separate browsers and navigate to `http://localhost:5500` (if you use Live Server on VS Code) to simulate multiple users.

- Enter a username when prompted.

- Start sending messages, and observe them appear in real-time across all connected clients.
