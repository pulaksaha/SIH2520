const jsonDb = require('../utils/jsonDb');
const { v4: uuidv4 } = require('uuid');

class User {
    constructor(data) {
        this.id = data.id || data._id || uuidv4();
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role || 'employee';
        this.department = data.department;
        this.position = data.position;
        this.createdAt = data.createdAt || new Date().toISOString();
        this._id = this.id; // Compatibility
    }

    async save() {
        const users = await jsonDb.getCollection('users');
        const existingIndex = users.findIndex(u => u._id === this.id || u.email === this.email);

        if (existingIndex !== -1) {
            // Update
            users[existingIndex] = { ...users[existingIndex], ...this };
        } else {
            // Insert
            users.push(this);
        }

        await jsonDb.saveCollection('users', users);
        return this;
    }

    static async findOne(query) {
        const users = await jsonDb.getCollection('users');
        const user = users.find(u => {
            for (const key in query) {
                if (u[key] !== query[key]) return false;
            }
            return true;
        });
        return user ? new User(user) : null;
    }

    static async findById(id) {
        const users = await jsonDb.getCollection('users');
        const user = users.find(u => u._id === id || u.id === id);
        return user ? new User(user) : null;
    }

    static async create(data) {
        const user = new User(data);
        await user.save();
        return user;
    }
}

module.exports = User;
