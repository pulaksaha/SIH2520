const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose'); // Keep for compatibility if needed, though not used for connection
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'database.json');

// MongoDB Connection Removed - Mock function
const connectDB = async () => {
    console.log('Using File-based Database');
};

const readDB = () => {
    if (!fs.existsSync(DB_PATH)) {
        return {}; // Should not happen if initialized correctly
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    try {
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
};

const writeDB = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Initialize file-based DB if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
    console.log('Initializing database.json...');
    const hashedPassword = bcrypt.hashSync('password', 10);
    const initialData = {
        users: [
            {
                _id: '1',
                name: 'Admin User',
                email: 'admin@brahmaputraboard.gov.in',
                password: hashedPassword,
                role: 'admin',
                department: 'Administration',
                position: 'System Administrator',
                createdAt: new Date().toISOString()
            }
        ],
        kpis: [],
        performanceScores: [],
        projects: [],
        expenses: [],
        tickets: [],
        reports: [],
        requests: []
    };
    writeDB(initialData);
    console.log('Database initialized with default admin user.');
}

const createModel = (collectionName) => {
    return {
        find: async (query = {}) => {
            const db = readDB();
            const items = db[collectionName] || [];
            if (Object.keys(query).length === 0) return items;
            return items.filter(item => {
                return Object.entries(query).every(([key, value]) => item[key] === value);
            });
        },
        findOne: async (query) => {
            const db = readDB();
            const items = db[collectionName] || [];
            return items.find(item => {
                return Object.entries(query).every(([key, value]) => item[key] === value);
            }) || null;
        },
        findById: async (id) => {
            const db = readDB();
            const items = db[collectionName] || [];
            return items.find(item => item._id === id || item.id === id) || null;
        },
        create: async (data) => {
            const db = readDB();
            if (!db[collectionName]) db[collectionName] = [];
            const newItem = { _id: require('uuid').v4(), ...data, createdAt: new Date() };
            db[collectionName].push(newItem);
            writeDB(db);
            return newItem;
        },
        insertMany: async (dataArray) => {
            const db = readDB();
            if (!db[collectionName]) db[collectionName] = [];
            const newItems = dataArray.map(data => ({ _id: require('uuid').v4(), ...data, createdAt: new Date() }));
            db[collectionName].push(...newItems);
            writeDB(db);
            return newItems;
        },
        deleteMany: async () => {
            const db = readDB();
            db[collectionName] = [];
            writeDB(db);
            return { acknowledged: true, deletedCount: 0 };
        }
    };
};

module.exports = {
    connectDB,
    readDB,
    writeDB,
    createModel
};
