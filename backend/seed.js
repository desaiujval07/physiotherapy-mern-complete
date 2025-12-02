const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Service.deleteMany();
    await Testimonial.deleteMany();

    console.log('Cleared existing data');

    // Create Admin User
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@physio.com',
      password: 'admin123',
      phone: '1234567890',
      role: 'admin'
    });

    console.log('Admin created');

    // Create Therapists
    const therapist1 = await User.create({
      name: 'Dr. Sarah Johnson',
      email: 'sarah@physio.com',
      password: 'therapist123',
      phone: '1234567891',
      role: 'therapist',
      specialization: 'Sports Injury',
      experience: 8,
      bio: 'Specialized in sports injury rehabilitation with 8 years of experience'
    });

    const therapist2 = await User.create({
      name: 'Dr. Michael Chen',
      email: 'michael@physio.com',
      password: 'therapist123',
      phone: '1234567892',
      role: 'therapist',
      specialization: 'Orthopedic',
      experience: 12,
      bio: 'Expert in orthopedic physiotherapy with focus on post-surgical rehabilitation'
    });

    const therapist3 = await User.create({
      name: 'Dr. Emily Rodriguez',
      email: 'emily@physio.com',
      password: 'therapist123',
      phone: '1234567893',
      role: 'therapist',
      specialization: 'Neurological',
      experience: 10,
      bio: 'Specialized in neurological rehabilitation and stroke recovery'
    });

    console.log('Therapists created');

    // Create Sample Patients
    const patient1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'patient123',
      phone: '9876543210',
      role: 'patient'
    });

    const patient2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'patient123',
      phone: '9876543211',
      role: 'patient'
    });

    console.log('Patients created');

    // Create Services
    const services = await Service.insertMany([
      {
        title: 'Sports Injury Rehabilitation',
        description: 'Comprehensive treatment for sports-related injuries including sprains, strains, and overuse injuries. Our specialized approach helps athletes return to peak performance.',
        duration: 60,
        price: 80,
        category: 'Sports Injury',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
      },
      {
        title: 'Post-Surgical Rehabilitation',
        description: 'Expert care for recovery after orthopedic surgery. Personalized programs to restore mobility, strength, and function.',
        duration: 45,
        price: 90,
        category: 'Orthopedic',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400'
      },
      {
        title: 'Back Pain Management',
        description: 'Effective treatment for chronic and acute back pain using manual therapy, exercises, and education.',
        duration: 45,
        price: 75,
        category: 'Orthopedic',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'
      },
      {
        title: 'Stroke Rehabilitation',
        description: 'Specialized neurological rehabilitation to help stroke survivors regain independence and improve quality of life.',
        duration: 60,
        price: 100,
        category: 'Neurological',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400'
      },
      {
        title: 'Pediatric Physiotherapy',
        description: 'Gentle, effective treatment for children with developmental delays, injuries, or neurological conditions.',
        duration: 45,
        price: 70,
        category: 'Pediatric',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400'
      },
      {
        title: 'Geriatric Care',
        description: 'Specialized care for elderly patients focusing on mobility, balance, and fall prevention.',
        duration: 45,
        price: 65,
        category: 'Geriatric',
        image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400'
      }
    ]);

    console.log('Services created');

    // Create Sample Testimonials
    await Testimonial.insertMany([
      {
        patient: patient1._id,
        rating: 5,
        comment: 'Excellent service! Dr. Sarah helped me recover from my knee injury much faster than expected. Highly recommended!',
        isApproved: true
      },
      {
        patient: patient2._id,
        rating: 5,
        comment: 'The team at PhysioLife is amazing. Professional, caring, and very knowledgeable. My back pain is completely gone!',
        isApproved: true
      }
    ]);

    console.log('Testimonials created');

    console.log('\n=================================');
    console.log('Database seeded successfully!');
    console.log('=================================');
    console.log('\nLogin Credentials:');
    console.log('\nAdmin:');
    console.log('Email: admin@physio.com');
    console.log('Password: admin123');
    console.log('\nTherapist 1:');
    console.log('Email: sarah@physio.com');
    console.log('Password: therapist123');
    console.log('\nPatient:');
    console.log('Email: john@example.com');
    console.log('Password: patient123');
    console.log('=================================\n');

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();