const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '../database.json');

class JsonDb {
    async readData() {
        try {
            const data = await fs.readFile(DB_PATH, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return { users: [] }; // Default structure
            }
            throw error;
        }
    }

    async writeData(data) {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    }

    async getCollection(collectionName) {
        const data = await this.readData();
        return data[collectionName] || [];
    }

    async saveCollection(collectionName, items) {
        const data = await this.readData();
        data[collectionName] = items;
        await this.writeData(data);
    }
}

module.exports = new JsonDb();
