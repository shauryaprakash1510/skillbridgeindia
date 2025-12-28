const API_URL = 'http://localhost:3000/api';

const api = {
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error.message };
        }
    },

    async register(fullname, email, password, category) {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, email, password, category })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    async getDashboardStats() {
        try {
            const response = await fetch(`${API_URL}/dashboard-stats`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching stats:', error);
            return null;
        }
    },

    logout() {
        localStorage.removeItem('user');
        window.location.href = '../pages/login.html';
    },

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Auth Guard
    requireAuth() {
        const user = this.getCurrentUser();
        if (!user) {
            window.location.href = '../pages/login.html';
        }
        return user;
    }
};

window.api = api;
