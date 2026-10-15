
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const Event = require('./models/Event'); 
const Registration = require('./models/Registration');

const app = express();
const PORT = 3000;

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/codingclub')
    .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Configure ejs-mate and views
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 


//  PUBLIC ROUTES
// Home Page
app.get('/', async (req, res) => {
    try {
        const upcomingEvents = await Event.find({}).limit(3); 
        res.render('index', { events: upcomingEvents });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Full Events Page 
app.get('/events', async (req, res) => {
    try {
        const allEvents = await Event.find({});
        res.render('events/index', { events: allEvents });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Team Page
app.get('/team', (req, res) => {
    res.render('pages/team');
});

// Gallery Page
app.get('/gallery', (req, res) => {
    res.render('pages/gallery');
});

// About Page
app.get('/about', (req, res) => {
    res.render('pages/about');
});


// DYNAMIC EVENT ROUTES 
// Show page for a single event
app.get('/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send('Event not found');
        res.render('events/show', { event });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Handle form submission
app.post('/events/:id/register', async (req, res) => {
    try {
        const { fullName, email, collegeRollNo, branchYear, teamName } = req.body;
        
        await Registration.create({
            eventId: req.params.id,
            fullName,
            email,
            collegeRollNo,
            branchYear,
            teamName: teamName || 'N/A'
        });

        res.render('events/success', { 
            name: fullName, 
            eventId: req.params.id 
        });
    } catch (err) {
        console.error(err);
        res.status(400).send('Error submitting registration');
    }
});



// 3. SECURE ADMIN ROUTES

const basicAuth = require('express-basic-auth');

// Admin Authentication Middleware
const adminAuth = basicAuth({
    users: { 'clubadmin': 'Sastra2026' }, // Change password before deployment
    challenge: true,
    unauthorizedResponse: 'Unauthorized access. Please log in.'
});

// Protect the admin route by injecting the middleware
app.get('/admin', adminAuth, async (req, res) => {
    try {
        const registrations = await Registration.find({}).populate('eventId').sort({ registeredAt: -1 });
        res.render('admin/dashboard', { registrations });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error fetching registrations');
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});