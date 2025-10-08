import express from "express";
import fs from "fs/promises";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Path to posts.json
const DATA_FILE = path.join(process.cwd(), "data", "posts.json");

// Helper to read posts safely
async function readPosts() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    if (err.code === "ENOENT") {
      return []; // file doesn't exist yet
    }
    throw err;
  }
}

// Helper to write posts
async function writePosts(posts) {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
}

/**
 * Task 1: Create a new post (POST)
 */
app.post("/api/posts", async (req, res) => {
  try {
    const { content, author, tags } = req.body;

    // Validation
    if (!content || !author) {
      return res.status(400).json({ error: "Content and author are required" });
    }
    if (content.length < 1 || content.length > 280) {
      return res.status(400).json({ error: "Content must be 1-280 characters" });
    }
    if (tags && (!Array.isArray(tags) || tags.length > 5 || !tags.every(t => typeof t === "string"))) {
      return res.status(400).json({ error: "Tags must be an array of up to 5 strings" });
    }

    // Create post object
    const newPost = {
      postId: Date.now().toString(),
      content,
      author,
      tags: tags || [],
      createdAt: new Date().toISOString(),
      likes: 0,
      status: "published",
    };

    const posts = await readPosts();
    posts.push(newPost);
    await writePosts(posts);

    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Task 2: Get all posts (GET)
 */
app.get("/api/posts", async (req, res) => {
  try {
    let posts = await readPosts();
    // Sort by createdAt (newest first)
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(posts);
  } catch (err) {
    console.error("Error reading posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req,res) => {
    res.send("API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
