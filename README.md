# PhysioLife - Complete MERN Stack Physiotherapy Website

A full-featured physiotherapy clinic management system built with MongoDB, Express.js, React.js, and Node.js.

## Features

- 🔐 User Authentication (Patient, Therapist, Admin)
- 📅 Appointment Booking System
- 💼 Service Management
- 👨‍⚕️ Therapist Profiles
- 💬 Testimonials
- 📧 Contact Form
- 📊 Admin Dashboard
- 📱 Responsive Design

## Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Axios
- React Toastify
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt.js

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/desaiujval07/physiotherapy-mern-complete.git
cd physiotherapy-mern-complete
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# This will automatically install both backend and frontend dependencies
```

3. **Configure Environment Variables**
```bash
# Backend .env file is already configured for local development
# Edit backend/.env if you want to use MongoDB Atlas or change settings
```

4. **Start the application**
```bash
# Start both backend and frontend concurrently
npm start
```

The application will open automatically at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Alternative: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

## Default Admin Credentials

After starting the app, you can create an admin account by registering with:
- Email: admin@physio.com
- Password: admin123
- Role: Select "Admin" during registration

Or use the seed script:
```bash
cd backend
npm run seed
```

## Project Structure

```
physiotherapy-mern-complete/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── serviceController.js
│   │   ├── appointmentController.js
│   │   ├── testimonialController.js
│   │   └── contactController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Appointment.js
│   │   ├── Testimonial.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── testimonialRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── PrivateRoute.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Services.js
│   │   │   ├── Therapists.js
│   │   │   ├── Appointments.js
│   │   │   ├── BookAppointment.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Contact.js
│   │   │   └── Dashboard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Services
- GET `/api/services` - Get all services
- GET `/api/services/:id` - Get single service
- POST `/api/services` - Create service (Admin)
- PUT `/api/services/:id` - Update service (Admin)
- DELETE `/api/services/:id` - Delete service (Admin)

### Appointments
- GET `/api/appointments` - Get user appointments
- GET `/api/appointments/:id` - Get single appointment
- POST `/api/appointments` - Create appointment
- PUT `/api/appointments/:id` - Update appointment
- DELETE `/api/appointments/:id` - Delete appointment

### Testimonials
- GET `/api/testimonials` - Get approved testimonials
- POST `/api/testimonials` - Create testimonial
- PUT `/api/testimonials/:id/approve` - Approve testimonial (Admin)

### Contact
- POST `/api/contact` - Submit contact form
- GET `/api/contact` - Get all contacts (Admin)

## User Roles

1. **Patient**
   - Book appointments
   - View own appointments
   - Submit testimonials
   - Contact clinic

2. **Therapist**
   - View assigned appointments
   - Update appointment status
   - Manage patient notes

3. **Admin**
   - Full access to dashboard
   - Manage services
   - Manage appointments
   - Approve testimonials
   - View contact submissions

## Features in Detail

### Appointment Booking
- Select service
- Choose therapist
- Pick date and time slot
- Add notes
- Real-time availability

### Admin Dashboard
- View all appointments
- Manage services (CRUD)
- Approve testimonials
- View contact submissions
- User management

### Responsive Design
- Mobile-friendly interface
- Tablet optimized
- Desktop enhanced

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/physiotherapy
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally
- Or use MongoDB Atlas connection string
- Check firewall settings

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email ujvaldesai01@gmail.com or open an issue in the repository.

## Acknowledgments

- Built with MERN Stack
- UI inspired by modern healthcare platforms
- Icons from React Icons

---

**Made with ❤️ by Ujval Desai**