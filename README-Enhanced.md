# 🎓 SchoolFinder - Enhanced School Management System

A comprehensive school search and management platform inspired by Uniform Application, built with Next.js, Express.js, and MySQL.

## ✨ Features

### 🔍 Advanced School Search
- **Search by Name, City, Address**: Find schools using comprehensive search functionality
- **Filter by Board**: CBSE, ICSE, IB, Cambridge, State Board, Pre-School
- **Filter by Gender Type**: All Boys, All Girls, Co-Education
- **Location-based Search**: Browse schools by popular cities
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🏫 School Management
- **Detailed School Profiles**: Include board, gender type, ratings, fees, establishment year
- **Image Upload**: Support for school images with validation
- **Rating System**: Star ratings and review counts
- **Contact Information**: Phone, email, website links

### 📧 Newsletter & Communication
- **Newsletter Subscription**: Email subscription with database storage
- **Contact Forms**: Multiple ways to reach out
- **School Portal**: Dedicated section for schools to add their information

### 🎨 Modern UI/UX
- **Clean Design**: Inspired by Uniform Application
- **Intuitive Navigation**: Easy-to-use menu with mobile support
- **Card-based Layout**: Beautiful school cards with all relevant information
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd schoolData
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup Database**
   - Create a MySQL database named `school_management`
   - Update database credentials in `backend/index.js`:
     ```javascript
     const db = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "yourpassword", // Change this
       database: "school_management",
     });
     ```
   - Run the SQL schema:
     ```bash
     mysql -u root -p school_management < backend/schema.sql
     ```

4. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both frontend (port 3000) and backend (port 5000) simultaneously.

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
schoolData/
├── frontend/                 # Next.js React application
│   ├── app/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navigation.js
│   │   │   └── Footer.js
│   │   ├── addSchool/       # Add school page
│   │   ├── showSchools/     # School listing page
│   │   ├── layout.js        # Root layout
│   │   ├── page.js          # Homepage
│   │   └── globals.css      # Global styles
│   └── package.json
├── backend/                 # Express.js API server
│   ├── index.js            # Main server file
│   ├── schema.sql          # Database schema
│   ├── schoolImages/       # Uploaded images
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## 🛠 API Endpoints

### Schools
- `GET /api/schools` - Get all schools with pagination and filters
  - Query params: `page`, `limit`, `search`, `city`, `board`, `gender_type`
- `POST /api/schools` - Add a new school (with image upload)

### Utilities
- `GET /api/cities` - Get list of all cities
- `POST /api/newsletter` - Subscribe to newsletter

## 🎯 Key Features Implemented

### Homepage
- **Hero Section** with search functionality
- **Popular Cities** quick navigation
- **Board Filters** for easy browsing
- **Gender Type Filters**
- **Newsletter Subscription**
- **Featured Schools** section

### School Listing
- **Advanced Filtering** by city, board, gender type
- **Search Functionality** with real-time results
- **Responsive Grid Layout** with 3 columns on desktop
- **School Cards** with ratings, board badges, and key information
- **Pagination** for large datasets
- **Active Filter Display**

### School Registration
- **Comprehensive Form** with validation
- **Image Upload** with file type and size validation
- **Board and Gender Type** selection
- **Additional Fields**: established year, website, fees range, description
- **Real-time Validation** with user-friendly error messages

### Navigation & Layout
- **Sticky Navigation** with mobile menu
- **Professional Footer** with links and contact information
- **Responsive Design** that works on all devices
- **Loading States** and error handling throughout

## 🔧 Technical Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: MySQL with mysql2 driver
- **File Upload**: Multer for image handling
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS with custom components

## 📱 Responsive Design

The application is fully responsive and tested on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Design Inspiration

This project is inspired by the Uniform Application website, featuring:
- Clean, modern interface
- Card-based school listings
- Advanced search and filtering
- Professional navigation
- Newsletter integration
- Responsive mobile design

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/.next`

### Backend (Railway/Heroku)
1. Deploy the backend folder to your preferred platform
2. Set environment variables for database connection
3. Update frontend API URLs to point to production backend

## 📞 Support

For support and questions:
- Email: support@schoolfinder.com
- Phone: +91 98765 43210

## 📄 License

This project is licensed under the MIT License.
