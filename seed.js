
const mongoose = require('mongoose');
const Event = require('./models/Event');

mongoose.connect('mongodb://127.0.0.1:27017/codingclub')
    .then(() => console.log('Connected to MongoDB for seeding'))
    .catch(err => console.log(err));

const initialEvents = [
    {
        title: 'Hacktober',
        category: 'Team Event',
        tagline: 'BUILD. INNOVATE. COMPETE.',
        duration: '12 Hours',
        description: 'A 12-hour team-based coding marathon where participants develop functional prototypes.'
    },
    {
        title: 'Blind Coding',
        category: 'Individual',
        tagline: 'Code Without Seeing.',
        duration: 'Strict Time Limit',
        description: 'Write complete programs with blanked screens, testing raw syntax memory and logic.'
    }
   
];

const seedDB = async () => {
    await Event.deleteMany({}); // Clears existing data 
    await Event.insertMany(initialEvents);
    console.log('Database seeded with Code Sastra events!');
    mongoose.connection.close(); 
};

seedDB();