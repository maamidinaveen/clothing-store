🛍️ Clothing Brand E-Commerce Web App
MERN Stack (MongoDB, Express.js, React.js, Node.js)

A fully functional e-commerce web application built for a fictional clothing brand.
Users can browse products, filter & search, add items to cart, checkout, and receive confirmation emails.

This project uses:

- Frontend: React.js (Class Components, React Router v6)

- Backend: Node.js + Express.js

- Database: MongoDB Atlas (Cloud)

- Auth: JWT + HTTP-only cookies

-Email Service: Nodemailer + Google App Password

-Cart System: MongoDB Cart (logged-in)

⭐ Features

👤 User Accounts

- Register (name, email, password)

- Login with JWT (stored in HTTP-only cookie)

- Logout

- Protected Routes (frontend + backend)

👕 Product Management

- 20+ demo products seeded via seedProducts.js

- Product categories (Men, Women, Kids)

- Sizes (S, M, L, XL)

- Product details page

🔍 Filters & Search

- Search by name/description

- Filter by:

  - Category

  - Size

  - Price range (minPrice / maxPrice)

- Pagination (page & limit)

- Filters work together

🛒 Shopping Cart

- Guest users → cart stored in localStorage

- Logged-in users → cart synced with MongoDB

- Update quantities

- Remove items

- Add multiple items with same size/qty merged properly

💳 Checkout & Orders

- Backend validates cart, creates order

- Stores order under user

- Clears frontend cart

- Shows Order Success page

📧 Order Confirmation Email

- Sent using Nodemailer

- Email includes:

  - Order ID

  - Order date

  - Product list + qty + size

  - Total amount

📁 Folder Structure

backend/
│── config/
│ └── db.js
│── controllers/
│ ├── authController.js
│ ├── productController.js
│ ├── cartController.js
│ └── orderController.js
│── middleware/
│ └── authMiddleware.js
│── models/
│ ├── User.js
│ ├── Product.js
│ ├── Cart.js
│ └── Order.js
│── routes/
│ ├── authRoutes.js
│ ├── productRoutes.js
│ ├── cartRoutes.js
│ └── orderRoutes.js
│── seedProducts.js
│── server.js
│── .env

frontend/
│── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── Filters.jsx
│ │ └── ProtectedRoute.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Products.jsx
│ │ ├── ProductDetail.jsx
│ │ ├── Cart.jsx
│ │ ├── Checkout.jsx
│ │ ├── OrderSuccess.jsx
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ ├── services/
│ │ └── api.js
│ └── App.js
└── package.json

⚙️ Backend Setup

1. install dependencies

   cd backend
   npm instal

2. create .env file

   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

   # Email Service

   EMAIL_USER=yourgmail@gmail.com
   EMAIL_PASS=your_16_digit_google_app_password
   EMAIL_FROM="Clothing Store <yourgmail@gmail.com>"

   🔥 Important:
   For Gmail, use App Password, not normal password.

3. Seed Demo Products

   node seedProducts.js

4. start backend

   npm run dev

🎨 Frontend Setup

1. Install dependencies

   cd frontend
   npm install

2. npm start

Runs on http://localhost:3000
