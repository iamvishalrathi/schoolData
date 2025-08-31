import express from "express";
import multer from "multer";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// Create schoolImages directory if it doesn't exist
const uploadDir = "schoolImages";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/schoolImages", express.static("schoolImages"));

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword", // Change this to your MySQL password
  database: "school_management", // Change this to your database name
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Multer storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "schoolImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// API: Add School
app.post("/api/schools", upload.single("image"), (req, res) => {
  const { 
    name, 
    address, 
    city, 
    state, 
    contact, 
    email_id, 
    board = 'CBSE',
    gender_type = 'Co-Education',
    established_year,
    website,
    description,
    fees_range
  } = req.body;
  const imagePath = req.file ? `/schoolImages/${req.file.filename}` : null;

  const sql = `INSERT INTO schools (
    name, address, city, state, contact, image, email_id, 
    board, gender_type, established_year, website, description, fees_range
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, [
    name, address, city, state, contact, imagePath, email_id,
    board, gender_type, established_year, website, description, fees_range
  ], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "School added successfully", id: result.insertId });
  });
});

// API: Get Schools with pagination, search, and filters
app.get("/api/schools", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const search = req.query.search || "";
  const city = req.query.city || "";
  const board = req.query.board || "";
  const genderType = req.query.gender_type || "";
  const offset = (page - 1) * limit;

  let whereClause = "";
  let queryParams = [];

  const conditions = [];
  
  if (search) {
    conditions.push("(name LIKE ? OR city LIKE ? OR address LIKE ?)");
    queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  
  if (city) {
    conditions.push("city = ?");
    queryParams.push(city);
  }
  
  if (board) {
    conditions.push("board = ?");
    queryParams.push(board);
  }
  
  if (genderType) {
    conditions.push("gender_type = ?");
    queryParams.push(genderType);
  }

  if (conditions.length > 0) {
    whereClause = "WHERE " + conditions.join(" AND ");
  }

  // Get total count
  const countSql = `SELECT COUNT(*) as total FROM schools ${whereClause}`;
  db.query(countSql, queryParams, (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;

    // Get schools with pagination
    const sql = `SELECT 
      id, name, address, city, image, board, gender_type, 
      established_year, rating, total_reviews, fees_range, description 
      FROM schools ${whereClause} ORDER BY rating DESC, id DESC LIMIT ? OFFSET ?`;
    const params = [...queryParams, limit, offset];

    db.query(sql, params, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        schools: results,
        total: total,
        page: page,
        totalPages: Math.ceil(total / limit)
      });
    });
  });
});

// API: Get unique cities for filter dropdown
app.get("/api/cities", (req, res) => {
  const sql = "SELECT DISTINCT city FROM schools ORDER BY city";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(row => row.city));
  });
});

// API: Newsletter subscription
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const sql = "INSERT INTO newsletter_subscriptions (email) VALUES (?) ON DUPLICATE KEY UPDATE status = 'active'";
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Successfully subscribed to newsletter!" });
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
