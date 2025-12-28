const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/'))); // Serve static files

// Mock Database
const users = [
    {
        email: 'user@skillbridge.in',
        password: 'password123',
        name: 'Shaurya Prakash',
        role: 'user'
    }
];

const dashboardStats = {
    skillGaps: { value: 3, label: 'High Priority' },
    recommendedJobs: { value: 12, label: 'Based on your profile' },
    pendingCourses: { value: 5, label: '2 certifications expiring' },
    upcomingEvents: { value: 2, label: 'Webinars this week' },
    availableMentors: { value: 8, label: 'Online now' },
    profileViews: { value: 45, label: '+12% from last week' }
};

// Routes

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Register Endpoint (Mock)
app.post('/api/register', (req, res) => {
    const { fullname, email, password } = req.body;
    // Simple mock registration
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = { email, password, name: fullname, role: 'user' };
    users.push(newUser);

    res.json({ success: true, message: 'Registration successful', user: { name: newUser.name, email: newUser.email } });
});

// Dashboard Data Endpoint
app.get('/api/dashboard-stats', (req, res) => {
    // Simulate latency for realism
    setTimeout(() => {
        res.json(dashboardStats);
    }, 500);
});

// Serve frontend for any other route (SPA Fallback-ish, though we rely on static files predominantly)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});
