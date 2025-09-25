# 📡 Social API

A simple Node.js + Express API that allows users to **create and fetch posts**.  
Deployed on **Render** with persistent storage using a local `posts.json` file.

---

## 🚀 Features
- Create a post with `content`, `author`, and optional `tags`.
- Posts are stored in `data/posts.json`.
- Fetch all posts sorted by newest first.
- Input validation:
  - `content`: required, 1–280 characters
  - `author`: required
  - `tags`: optional, array of up to 5 strings
- Default values:
  - `postId`: auto-generated using `Date.now()`
  - `createdAt`: current timestamp
  - `likes`: 0
  - `status`: "published"

---

## 📂 Project Structure

social-api/
├── data/
│ └── posts.json
├── routes/ # optional: for modular route handling
├── server.js # main server file
├── package.json # project metadata & dependencies
├── .env # optional environment variables
├── README.md # project overview & deployment steps
└── screenshots.pdf # deployment proof

---

## 🛠 Local Setup

1. Clone repository:
   `git clone https://github.com/yourusername/social-api.git`
   
   `cd social-api`
Install dependencies:
`npm install`

Run the server:
`npm start`

Access locally:
`http://localhost:3000/api/posts`

API Endpoints
Create a New Post

POST /api/posts

Request Body:

{
  "content": "Hello, my first post!",
  "author": "Varshith",
  "tags": ["intro", "first"]
}


Response:

{
  "postId": "1695648456789",
  "content": "Hello, my first post!",
  "author": "Varshith",
  "tags": ["intro", "first"],
  "createdAt": "2025-09-25T04:30:00.000Z",
  "likes": 0,
  "status": "published"
}

Get All Posts

GET /api/posts

Response:

[
  {
    "postId": "1695648456789",
    "content": "Hello, my first post!",
    "author": "Varshith",
    "tags": ["intro", "first"],
    "createdAt": "2025-09-25T04:30:00.000Z",
    "likes": 0,
    "status": "published"
  }
]

☁️ Deployment Instructions (Render)
Step 1: Prepare Your Code

Ensure package.json has:

"scripts": {
  "start": "node server.js"
}


Server must listen on:

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));


Add proper error handling for file operations.

Step 2: Deploy to Render

Push your code to a GitHub repository.

Go to Render and login.

Click New + → Web Service.

Connect your GitHub repository.

Configure:

Name: social-api-[yourname]

Environment: 'Node'

Build Command: `npm install`

Start Command: `npm start`

Click Create Web Service.

Wait 5–10 minutes for deployment.