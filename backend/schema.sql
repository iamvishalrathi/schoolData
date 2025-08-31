-- Create database
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(20) NOT NULL,
  image TEXT,
  email_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO schools (name, address, city, state, contact, email_id) VALUES
('ABC Public School', '123 Main Street, Sector 1', 'Mumbai', 'Maharashtra', '9876543210', 'info@abcschool.com'),
('XYZ International School', '456 Park Avenue, Block B', 'Delhi', 'Delhi', '9876543211', 'contact@xyzschool.com'),
('PQR Convent School', '789 Garden Road, Phase 2', 'Bangalore', 'Karnataka', '9876543212', 'admin@pqrschool.com');
