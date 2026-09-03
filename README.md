# 🍕 Pizza Ordering App

A full-stack pizza ordering application built with **React** and **Laravel**.

Customers can browse pizzas, manage their cart, place orders, and track their orders. Administrators can manage pizzas, upload pizza images, manage customer orders, and monitor the restaurant through a dedicated admin dashboard.

---

## ✨ Features

### 👤 Customer Features

* User registration and authentication
* Browse available pizzas
* View pizza information
* Add pizzas to the cart
* Update pizza quantities
* Remove items from the cart
* Cart persistence using Local Storage
* Checkout and place orders
* View personal orders
* View order details
* Track order status

### 👨‍💼 Admin Features

* Admin dashboard
* Dashboard statistics
* Recent orders
* Pizza management
* Create pizzas
* Update pizzas
* Delete pizzas
* Upload pizza images
* Replace existing pizza images
* Automatically delete old images when replaced
* Manage customer orders
* View order details
* Update order status
* Search orders
* Filter orders by status
* Server-side pagination
* Responsive admin interface
* Success and error toast notifications

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router
* Local Storage

### Backend

* Laravel
* Laravel Sanctum
* MySQL
* Laravel API Resources
* Form Requests
* Eloquent Relationships
* Laravel Storage

---

## 📁 Project Structure

```text
pizza-ordering-app/
│
├── client/                 # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── serverside/             # Laravel backend
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
│
└── README.md
```

---

## 🏗️ Application Architecture

```text
React Frontend
      ↓
   Axios API
      ↓
Laravel REST API
      ↓
Controllers
      ↓
Models & Relationships
      ↓
MySQL Database
```

---

## 📦 Database Structure

The application includes the following main entities:

* Users
* Pizzas
* Orders
* Order Items

### Relationships

```text
User
 └── has many Orders

Order
 ├── belongs to User
 └── has many Order Items

Order Item
 ├── belongs to Order
 └── belongs to Pizza
```

---

## 🍕 Pizza Image Upload

Pizza images are uploaded from the React admin panel using `FormData`.

The image upload flow:

```text
Admin selects image
        ↓
React sends FormData
        ↓
Laravel validates the image
        ↓
Laravel stores the image
        ↓
Image path is saved in the database
        ↓
API returns the image URL
        ↓
React displays the image
```

Supported image formats:

* JPG
* JPEG
* PNG
* WEBP

Maximum image size:

```text
2 MB
```

When an administrator replaces a pizza image, the previous image is automatically deleted from storage.

---

## 🔐 Authentication

Authentication is handled using **Laravel Sanctum**.

Protected routes require authentication.

Admin routes require:

```text
Authenticated User
        +
Admin Permission
```

Admin routes are protected using:

```text
auth:sanctum
admin
```

---

## 📋 Order Status

Orders can have the following statuses:

* Pending
* Preparing
* Delivered
* Canceled

Administrators can update the status directly from the admin order management interface.

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Super-Senior-Dev/pizza-ordering-app.git
```

Navigate to the project:

```bash
cd pizza-ordering-app
```

---

## 2. Backend Setup

Navigate to the Laravel backend:

```bash
cd serverside
```

Install PHP dependencies:

```bash
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure your database credentials inside the `.env` file.

Run database migrations:

```bash
php artisan migrate
```

Create the storage link for pizza images:

```bash
php artisan storage:link
```

Start the Laravel development server:

```bash
php artisan serve
```

The backend will typically run at:

```text
http://127.0.0.1:8000
```

---

## 3. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the frontend URL in your terminal.

---

## 🎯 API Features

The Laravel API includes:

* User authentication
* Pizza management
* Pizza image uploads
* Order creation
* Customer order history
* Customer order details
* Admin order management
* Order status updates
* Search
* Filtering
* Pagination
* API Resources

---

## 📱 Responsive Design

The application is designed to work across different screen sizes, including:

* 💻 Desktop
* 📱 Mobile devices
* 📟 Tablets

The admin dashboard, pizza management, and order management interfaces include responsive layouts for smaller screens.

---

## 🔮 Future Improvements

Possible future improvements include:

* Online payment integration
* Multiple images for each pizza
* Pizza categories
* Customer profile management
* Email notifications
* Advanced order tracking
* Production deployment

---

## 👨‍💻 Author

**Ahmad Khan**

GitHub: https://github.com/Super-Senior-Dev

---

## 📄 License

This project was created for learning and portfolio purposes.
