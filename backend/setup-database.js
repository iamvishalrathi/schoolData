import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function setupDatabase() {
    let connection;

    try {
        // Create connection to the database
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306
        });

        console.log('Connected to MySQL database');

        // Create schools table
        const createSchoolsTable = `
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
        total_reviews INT DEFAULT 0
      )
    `;

        await connection.execute(createSchoolsTable);
        console.log('Schools table created successfully');

        // Create newsletter subscriptions table
        const createNewsletterTable = `
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        status ENUM('active', 'unsubscribed') DEFAULT 'active'
      )
    `;

        await connection.execute(createNewsletterTable);
        console.log('Newsletter subscriptions table created successfully');

        // Insert sample data
        const insertSampleData = `
      INSERT IGNORE INTO schools (name, address, city, state, contact, email_id, board, gender_type, established_year, rating, total_reviews, fees_range) VALUES
      ('La Martiniere College', 'Hazratganj', 'Lucknow', 'Uttar Pradesh', '9876543210', 'info@lamartiniere.com', 'ICSE', 'All Boys', 1845, 4.5, 150, '₹50,000 - ₹1,00,000'),
      ('Jagran Public School', 'Gomti Nagar', 'Lucknow', 'Uttar Pradesh', '9876543211', 'contact@jagranschool.com', 'CBSE', 'Co-Education', 1990, 4.3, 200, '₹30,000 - ₹60,000'),
      ('Seth Anandram Jaipuria', 'Gomti Nagar', 'Lucknow', 'Uttar Pradesh', '9876543212', 'admin@jaipuria.com', 'CBSE', 'Co-Education', 1995, 4.4, 180, '₹40,000 - ₹80,000'),
      ('Fortune World School', 'Sector-105', 'Noida', 'Uttar Pradesh', '9876543213', 'info@fortuneworld.com', 'CBSE', 'Co-Education', 2005, 4.2, 120, '₹60,000 - ₹1,20,000'),
      ('Pathways World School Aravali', 'Sohna Road', 'Gurgaon', 'Haryana', '9876543214', 'contact@pathways.com', 'IB', 'Co-Education', 2008, 4.6, 90, '₹2,00,000 - ₹4,00,000'),
      ('The Paras World School', 'Sector 50', 'Gurgaon', 'Haryana', '9876543215', 'admin@parasworld.com', 'CBSE', 'Co-Education', 2010, 4.1, 110, '₹80,000 - ₹1,50,000')
    `;

        await connection.execute(insertSampleData);
        console.log('Sample data inserted successfully');

        console.log('Database setup completed successfully!');

    } catch (error) {
        console.error('Database setup failed:', error.message);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
}

// Run the setup
setupDatabase();
