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
  const { name, address, city, state, contact, email_id } = req.body;
  const imagePath = req.file ? `/schoolImages/${req.file.filename}` : null;

  const sql =
    "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, address, city, state, contact, imagePath, email_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "School added successfully", id: result.insertId });
    }
  );
});

// API: Get Schools with pagination and search
app.get("/api/schools", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const search = req.query.search || "";
  const offset = (page - 1) * limit;

  let whereClause = "";
  let queryParams = [];

  if (search) {
    whereClause = "WHERE name LIKE ? OR city LIKE ? OR address LIKE ?";
    queryParams = [`%${search}%`, `%${search}%`, `%${search}%`];
  }

  // Get total count
  const countSql = `SELECT COUNT(*) as total FROM schools ${whereClause}`;
  db.query(countSql, queryParams, (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;

    // Get schools with pagination
    const sql = `SELECT id, name, address, city, image FROM schools ${whereClause} ORDER BY id DESC LIMIT ? OFFSET ?`;
    const params = search ? [...queryParams, limit, offset] : [limit, offset];

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

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
