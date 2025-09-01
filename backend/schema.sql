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
  board ENUM('CBSE', 'ICSE', 'IB', 'IGCSE', 'Cambridge', 'State Board', 'Pre-School') DEFAULT 'CBSE',
  gender_type ENUM('All Boys', 'All Girls', 'Co-Education') DEFAULT 'Co-Education',
  established_year INT,
  website VARCHAR(255),
  description TEXT,
  fees_range VARCHAR(100),
  rating DECIMAL(2,1) DEFAULT 0.0,
  total_reviews INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add newsletter subscription table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'unsubscribed') DEFAULT 'active'
);

-- Add contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('new', 'read', 'responded') DEFAULT 'new'
);

-- Add school reviews table
CREATE TABLE IF NOT EXISTS school_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  school_id INT NOT NULL,
  rating DECIMAL(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  reviewer_name VARCHAR(255),
  reviewer_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);

-- Insert sample data (optional)
INSERT INTO schools (name, address, city, state, contact, email_id, board, gender_type, established_year, rating, total_reviews, fees_range) VALUES
('La Martiniere College', 'Hazratganj', 'Lucknow', 'Uttar Pradesh', '9876543210', 'info@lamartiniere.com', 'ICSE', 'All Boys', 1845, 4.5, 150, '₹50,000 - ₹1,00,000'),
('Jagran Public School', 'Gomti Nagar', 'Lucknow', 'Uttar Pradesh', '9876543211', 'contact@jagranschool.com', 'CBSE', 'Co-Education', 1990, 4.3, 200, '₹30,000 - ₹60,000'),
('Seth Anandram Jaipuria', 'Gomti Nagar', 'Lucknow', 'Uttar Pradesh', '9876543212', 'admin@jaipuria.com', 'CBSE', 'Co-Education', 1995, 4.4, 180, '₹40,000 - ₹80,000'),
('Fortune World School', 'Sector-105', 'Noida', 'Uttar Pradesh', '9876543213', 'info@fortuneworld.com', 'CBSE', 'Co-Education', 2005, 4.2, 120, '₹60,000 - ₹1,20,000'),
('Pathways World School Aravali', 'Sohna Road', 'Gurgaon', 'Haryana', '9876543214', 'contact@pathways.com', 'IB', 'Co-Education', 2008, 4.6, 90, '₹2,00,000 - ₹4,00,000'),
('The Paras World School', 'Sector 50', 'Gurgaon', 'Haryana', '9876543215', 'admin@parasworld.com', 'CBSE', 'Co-Education', 2010, 4.1, 110, '₹80,000 - ₹1,50,000');
