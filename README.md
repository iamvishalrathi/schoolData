# School Management System

A comprehensive web application for managing school information, built with Next.js and Node.js/Express with MySQL database.

## Features

- **Add School**: Form to register new schools with validation and image upload
- **View Schools**: Display schools in a responsive grid layout with search and pagination
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Image Upload**: Store and display school images
- **Search & Filter**: Find schools by name, city, or address
- **Pagination**: Efficiently browse through large numbers of schools

## Tech Stack

### Frontend

- **Next.js 15.5.2** - React framework
- **React Hook Form** - Form handling and validation
- **Tailwind CSS** - Styling and responsive design
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database client
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- Git

### Database Setup

1. Install and start MySQL server
2. Create a new database:

```sql
CREATE DATABASE school_management;
```

3. Run the schema file:

```bash
mysql -u root -p school_management < backend/schema.sql
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Update database configuration in `index.js`:

```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_mysql_password", // Update this
  database: "school_management",
});
```

4. Start the backend server:

```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

### Adding a New School

1. Navigate to `/addSchool` or click "Add School" in the navigation
2. Fill out the form with school details:
   - School Name (required)
   - Address (required)
   - City (required)
   - State (required)
   - Contact Number (10 digits, required)
   - Email Address (valid email, required)
   - School Image (JPG/PNG/GIF, max 5MB, required)
3. Click "Add School" to submit

### Viewing Schools

1. Navigate to `/showSchools` or click "View Schools" in the navigation
2. Use the search bar to find specific schools by name, city, or address
3. Browse through pages using pagination controls
4. Schools are displayed in a responsive grid with image, name, address, and city

## Database Schema

### schools table

```sql
CREATE TABLE schools (
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
```

## API Endpoints

### POST /api/schools

Add a new school with image upload

- **Body**: FormData with school details and image file
- **Response**: Success message with school ID

### GET /api/schools

Get schools with pagination and search

- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 6)
  - `search`: Search term for name/city/address
- **Response**: Array of schools with pagination info

## File Structure

```
├── backend/
│   ├── index.js          # Express server and API routes
│   ├── package.json      # Backend dependencies
│   ├── schema.sql        # Database schema
│   └── schoolImages/     # Image upload directory
├── frontend/
│   ├── app/
│   │   ├── addSchool/
│   │   │   └── page.js   # Add school form
│   │   ├── showSchools/
│   │   │   └── page.js   # Display schools
│   │   ├── globals.css   # Global styles
│   │   ├── layout.js     # Layout with navigation
│   │   └── page.js       # Home page
│   ├── package.json      # Frontend dependencies
│   └── next.config.mjs   # Next.js configuration
└── README.md
```

## Deployment

### Vercel Deployment (Frontend)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy the frontend from the `frontend` directory

### Backend Deployment

You can deploy the backend to services like:

- **Heroku**: Easy deployment with MySQL add-on
- **Railway**: Simple deployment with built-in database
- **DigitalOcean App Platform**: Scalable deployment
- **AWS EC2**: Full control deployment

### Environment Variables

Make sure to set up environment variables for production:

- Database connection details
- File upload paths
- CORS origins

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes as part of a web development assignment.
