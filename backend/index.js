import express from "express";
import multer from "multer";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Debug: Log environment variables
console.log('Environment variables loaded:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

const app = express();

// CORS configuration to allow multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://school-data-five.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean); // Remove any undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Create schoolImages directory if it doesn't exist
const uploadDir = "schoolImages";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/schoolImages", express.static("schoolImages"));

// DB Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // Use env variables for security
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
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

// API: Get school by ID
app.get("/api/schools/:id", (req, res) => {
  const schoolId = req.params.id;
  const sql = "SELECT * FROM schools WHERE id = ?";
  
  db.query(sql, [schoolId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json(results[0]);
  });
});

// API: Update school information
app.put("/api/schools/:id", upload.single("image"), (req, res) => {
  const schoolId = req.params.id;
  const {
    name, address, city, state, contact, email_id,
    board, gender_type, established_year, website, description, fees_range
  } = req.body;
  
  let imagePath = null;
  if (req.file) {
    imagePath = `/schoolImages/${req.file.filename}`;
  }

  // Build dynamic SQL based on provided fields
  let updateFields = [];
  let values = [];

  if (name) { updateFields.push("name = ?"); values.push(name); }
  if (address) { updateFields.push("address = ?"); values.push(address); }
  if (city) { updateFields.push("city = ?"); values.push(city); }
  if (state) { updateFields.push("state = ?"); values.push(state); }
  if (contact) { updateFields.push("contact = ?"); values.push(contact); }
  if (email_id) { updateFields.push("email_id = ?"); values.push(email_id); }
  if (board) { updateFields.push("board = ?"); values.push(board); }
  if (gender_type) { updateFields.push("gender_type = ?"); values.push(gender_type); }
  if (established_year) { updateFields.push("established_year = ?"); values.push(established_year); }
  if (website) { updateFields.push("website = ?"); values.push(website); }
  if (description) { updateFields.push("description = ?"); values.push(description); }
  if (fees_range) { updateFields.push("fees_range = ?"); values.push(fees_range); }
  if (imagePath) { updateFields.push("image = ?"); values.push(imagePath); }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  values.push(schoolId);
  const sql = `UPDATE schools SET ${updateFields.join(", ")} WHERE id = ?`;

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json({ message: "School updated successfully" });
  });
});

// API: Delete school
app.delete("/api/schools/:id", (req, res) => {
  const schoolId = req.params.id;
  
  // First, get the school to find the image path
  const getSchoolSql = "SELECT image FROM schools WHERE id = ?";
  db.query(getSchoolSql, [schoolId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length > 0 && results[0].image) {
      // Delete the image file
      const imagePath = path.join(process.cwd(), results[0].image.substring(1)); // Remove leading slash
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the school record
    const deleteSql = "DELETE FROM schools WHERE id = ?";
    db.query(deleteSql, [schoolId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "School not found" });
      }
      res.json({ message: "School deleted successfully" });
    });
  });
});

// API: Get statistics
app.get("/api/stats", (req, res) => {
  const queries = [
    "SELECT COUNT(*) as totalSchools FROM schools",
    "SELECT COUNT(DISTINCT city) as totalCities FROM schools",
    "SELECT COUNT(DISTINCT board) as totalBoards FROM schools",
    "SELECT COUNT(*) as totalSubscribers FROM newsletter_subscriptions WHERE status = 'active'"
  ];

  Promise.all(queries.map(query => {
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      });
    });
  }))
  .then(results => {
    res.json({
      totalSchools: results[0].totalSchools || 0,
      totalCities: results[1].totalCities || 0,
      totalBoards: results[2].totalBoards || 0,
      totalSubscribers: results[3].totalSubscribers || 0
    });
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });
});

// API: Get featured schools (highest rated)
app.get("/api/schools/featured", (req, res) => {
  const sql = `SELECT 
    id, name, address, city, image, board, gender_type, 
    established_year, rating, total_reviews, fees_range, description 
    FROM schools 
    WHERE rating >= 4.0 
    ORDER BY rating DESC, total_reviews DESC 
    LIMIT 6`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// API: Contact form submission
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message, phone } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const sql = `INSERT INTO contact_submissions (name, email, subject, message, phone) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [name, email, subject || 'General Inquiry', message, phone || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Message sent successfully! We'll get back to you soon." });
  });
});

// API: School rating and review
app.post("/api/schools/:id/review", (req, res) => {
  const schoolId = req.params.id;
  const { rating, review, reviewer_name, reviewer_email } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  const sql = `INSERT INTO school_reviews (school_id, rating, review, reviewer_name, reviewer_email) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [schoolId, rating, review || '', reviewer_name || 'Anonymous', reviewer_email || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Update school's average rating
    const updateRatingSql = `
      UPDATE schools SET 
        rating = (SELECT AVG(rating) FROM school_reviews WHERE school_id = ?),
        total_reviews = (SELECT COUNT(*) FROM school_reviews WHERE school_id = ?)
      WHERE id = ?`;
    
    db.query(updateRatingSql, [schoolId, schoolId, schoolId], (err) => {
      if (err) console.error("Error updating school rating:", err);
      res.json({ message: "Review submitted successfully!" });
    });
  });
});

// API: Get reviews for a school
app.get("/api/schools/:id/reviews", (req, res) => {
  const schoolId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sql = `SELECT rating, review, reviewer_name, created_at FROM school_reviews 
               WHERE school_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  
  db.query(sql, [schoolId, limit, offset], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
