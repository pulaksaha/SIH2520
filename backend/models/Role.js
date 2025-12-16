const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ['admin', 'supervisor', 'employee', 'ippms_admin']
    },
    displayName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    permissions: [{
        type: String
    }],
    isSystemRole: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Role', RoleSchema);
