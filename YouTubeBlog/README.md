# 📝 Blogify - Full Stack Blogging Platform

Blogify is a full-stack blogging application built with **Node.js, Express.js, MongoDB, and EJS**.  
Users can create accounts, publish blogs, upload cover images, edit and delete their posts, and interact through comments.

The project demonstrates authentication, CRUD operations, file uploads, database relationships, and server-side rendering.

---

## 🚀 Features

### 👤 User Authentication
- User registration and login
- JWT-based authentication
- Cookie-based session handling
- Protected routes for authenticated users
- Logout functionality

### 📝 Blog Management (CRUD)
Users can:

- Create new blogs
- View all blogs
- Read individual blog posts
- Edit their own blogs
- Delete their own blogs

### 🖼️ Image Upload
- Upload blog cover images
- Store images associated with user accounts
- Display uploaded images with blog posts

### 💬 Comments System
- Add comments to blogs
- Display comments with user information
- User-based comment ownership

### 🎨 UI Features
- Responsive Bootstrap design
- Blog cards
- Styled authentication pages
- Blog detail pages
- Edit/Delete controls for blog owners

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload Handling)
- Method Override

## Frontend

- EJS Templates
- HTML5
- CSS3
- Bootstrap 5

## Development Tools

- Nodemon
- Git
- GitHub

---

# 📂 Project Structure
Blogify/
│
├── models/
│ ├── blog.js
│ ├── user.js
│ └── comment.js
│
├── routes/
│ ├── blog.js
│ └── user.js
│
├── middlewares/
│ └── authentication.js
│
├── services/
│ └── authentication.js
│
├── views/
│ ├── home.ejs
│ ├── blog.ejs
│ ├── addBlog.ejs
│ ├── editBlog.ejs
│ ├── signin.ejs
│ ├── signup.ejs
│ └── partial/
│
├── public/
│ └── uploads/
│
├── app.js
├── package.json
└── README.md


---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/blogify.git