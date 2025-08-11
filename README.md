# 🛒 ShoppyGlobe API

ShoppyGlobe API is a **RESTful e-commerce backend** built with **Node.js**, **Express.js**, and **MongoDB**.  
It provides core functionalities like **user authentication**, **product management**, and **cart handling**, making it a perfect starting point for a scalable e-commerce platform.

---

## 🚀 Features
- **User Authentication** (Register/Login with JWT)
- **Product Management** (Create, Read, Update, Delete)
- **Cart System** (Add, Remove, View products in cart)
- **Secure Routes** with token-based authentication
- **MongoDB Integration** using Mongoose

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Token (JWT)
- **Environment Variables:** dotenv

---

## 📂 Project Structure

shoppyglobe-api/
│── models/         # Mongoose schemas
│── routes/         # Express route handlers
│── controllers/    # Controller logic
│── middleware/     # Auth & error handling
│── server.js       # Entry point
│── .env            # Environment variables
│── package.json

## ⚙️ Installation & Setup

# Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git

# Navigate to the project folder
cd shoppyglobe-api

# Install dependencies
npm install

# Create a .env file and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

# Run the server
npm run dev
````

## 📌 API Endpoints

### 🔹 Auth Routes

| Method | Endpoint      | Description           |
| ------ | ------------- | --------------------- |
| POST   | /api/register | Register a new user   |
| POST   | /api/login    | Login & get JWT token |

### 🔹 Product Routes

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| GET    | /api/products      | Get all products |
| POST   | /api/products      | Add new product  |
| PUT    | /api/products/\:id | Update product   |
| DELETE | /api/products/\:id | Delete product   |

### 🔹 Cart Routes

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| GET    | /api/cart      | View cart items       |
| POST   | /api/cart      | Add product to cart   |
| DELETE | /api/cart/\:id | Remove item from cart |

---

## 🤝 Contributing

Pull requests are welcome. For significant changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the **MIT License**.

---

### ✨ Author

**Krishna Kawa**
```

