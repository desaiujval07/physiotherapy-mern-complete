# Complete Setup Guide for PhysioLife MERN Application

## Prerequisites
- Node.js (v14 or higher) - [Download](https://nodejs.org/)
- MongoDB (local or Atlas) - [Download](https://www.mongodb.com/try/download/community)
- Git - [Download](https://git-scm.com/)

## Step-by-Step Installation

### 1. Clone the Repository
```bash
git clone https://github.com/desaiujval07/physiotherapy-mern-complete.git
cd physiotherapy-mern-complete
```

### 2. Install MongoDB (if not already installed)

**Windows:**
- Download MongoDB Community Server from mongodb.com
- Run the installer
- MongoDB will start automatically as a service

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### 3. Install Dependencies

**Option A: Install All at Once (Recommended)**
```bash
npm run install-all
```

**Option B: Install Manually**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

### 4. Configure Environment Variables

The backend `.env` file is already configured for local development:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/physiotherapy
JWT_SECRET=physiotherapy_secret_key_2024_secure_token
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**If using MongoDB Atlas:**
1. Create account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/physiotherapy
```

### 5. Seed the Database (Optional but Recommended)

This creates sample data including admin user, therapists, services, and testimonials:

```bash
cd backend
npm run seed
```

**Default Login Credentials After Seeding:**
- **Admin:** admin@physio.com / admin123
- **Therapist:** sarah@physio.com / therapist123
- **Patient:** john@example.com / patient123

### 6. Start the Application

**Option A: Start Both Servers Concurrently (Recommended)**
```bash
npm start
```

**Option B: Start Manually in Separate Terminals**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### 7. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process using the port
```bash
# Kill port 5000
npx kill-port 5000

# Kill port 3000
npx kill-port 3000
```

### Module Not Found Error
```
Error: Cannot find module 'express'
```
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
**Solution:** Ensure backend is running and `FRONTEND_URL` in `.env` matches your frontend URL

## Project Structure

```
physiotherapy-mern-complete/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── .env            # Environment variables
│   ├── server.js       # Express server
│   └── seed.js         # Database seeder
├── frontend/
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── context/    # Context API
│   │   ├── App.js      # Main app component
│   │   └── index.js    # Entry point
│   └── package.json
├── package.json        # Root package file
└── README.md          # Documentation
```

## Available Scripts

### Root Directory
- `npm start` - Start both backend and frontend
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run install-all` - Install all dependencies

### Backend Directory
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Frontend Directory
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Features

### User Roles
1. **Patient**
   - Register/Login
   - Browse services
   - View therapists
   - Book appointments
   - View appointment history
   - Submit testimonials
   - Contact form

2. **Therapist**
   - Login
   - View assigned appointments
   - Update appointment status

3. **Admin**
   - Full dashboard access
   - Manage services (CRUD)
   - View all appointments
   - Approve testimonials
   - View contact submissions
   - User management

### API Endpoints

**Authentication**
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

**Services**
- GET `/api/services` - Get all services
- GET `/api/services/:id` - Get single service
- POST `/api/services` - Create service (Admin)
- PUT `/api/services/:id` - Update service (Admin)
- DELETE `/api/services/:id` - Delete service (Admin)

**Appointments**
- GET `/api/appointments` - Get user appointments
- POST `/api/appointments` - Create appointment
- PUT `/api/appointments/:id` - Update appointment
- DELETE `/api/appointments/:id` - Cancel appointment

**Testimonials**
- GET `/api/testimonials` - Get approved testimonials
- POST `/api/testimonials` - Create testimonial
- PUT `/api/testimonials/:id/approve` - Approve (Admin)

**Contact**
- POST `/api/contact` - Submit contact form
- GET `/api/contact` - Get all contacts (Admin)

**Users**
- GET `/api/users/therapists` - Get all therapists
- GET `/api/users` - Get all users (Admin)

## Testing the Application

1. **Register a new patient account**
   - Go to http://localhost:3000/register
   - Fill in details and register

2. **Login with seeded admin account**
   - Email: admin@physio.com
   - Password: admin123

3. **Browse services**
   - Navigate to Services page
   - View all available services

4. **Book an appointment**
   - Login as patient
   - Go to Book Appointment
   - Select service, therapist, date, and time

5. **Access admin dashboard**
   - Login as admin
   - Navigate to Dashboard
   - Manage appointments, services, testimonials

## Production Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Update `MONGODB_URI` to production database
3. Update `FRONTEND_URL` to production frontend URL
4. Deploy backend

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder
3. Set environment variables if needed

### Database (MongoDB Atlas)
1. Create production cluster
2. Whitelist IP addresses
3. Update connection string

## Support

For issues or questions:
- Email: ujvaldesai01@gmail.com
- GitHub Issues: https://github.com/desaiujval07/physiotherapy-mern-complete/issues

## License

MIT License - feel free to use this project for learning or commercial purposes.

---

**Happy Coding! 🚀**