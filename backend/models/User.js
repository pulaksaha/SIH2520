// Mongoose require removed

const { createModel } = require('../db');

class UserModel {
    constructor(data) {
        Object.assign(this, data);
    }

    async save() {
        const User = createModel('users');
        const existing = await User.findOne({ email: this.email });
        if (existing) throw new Error('User already exists');
        const savedUser = await User.create(this);
        Object.assign(this, savedUser);
        return this;
    }

    static async findOne(query) {
        const User = createModel('users');
        const user = await User.findOne(query);
        return user ? user : null;
    }

    static async findById(id) {
        const User = createModel('users');
        return await User.findById(id);
    }

    static async find(query) {
        const User = createModel('users');
        return await User.find(query);
    }

    static async deleteMany() {
        const User = createModel('users');
        return await User.deleteMany();
    }

    static async insertMany(users) {
        const User = createModel('users');
        return await User.insertMany(users);
    }
}

module.exports = UserModel;
