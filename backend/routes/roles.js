const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// Get all roles
router.get('/', async (req, res) => {
    try {
        const roles = await Role.find().sort({ name: 1 });
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get role by name
router.get('/:name', async (req, res) => {
    try {
        const role = await Role.findOne({ name: req.params.name });
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update role permissions
router.put('/:id', async (req, res) => {
    try {
        const { permissions } = req.body;

        const role = await Role.findByIdAndUpdate(
            req.params.id,
            { permissions },
            { new: true }
        );

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Initialize default roles (called once during setup)
router.post('/init', async (req, res) => {
    try {
        const defaultRoles = [
            {
                name: 'admin',
                displayName: 'Administrator',
                description: 'Full system access with all permissions',
                permissions: [
                    'view_kpi', 'view_kpis', 'edit_kpis',
                    'view_scores', 'add_scores',
                    'view_projects', 'manage_projects',
                    'view_expenses', 'manage_expenses',
                    'view_tickets', 'manage_tickets',
                    'view_rti', 'manage_rti',
                    'view_users', 'manage_users',
                    'manage_roles', 'view_logs'
                ],
                isSystemRole: true
            },
            {
                name: 'supervisor',
                displayName: 'Supervisor',
                description: 'Team management and oversight capabilities',
                permissions: [
                    'view_kpi', 'view_kpis',
                    'view_scores', 'add_scores',
                    'view_projects', 'manage_projects',
                    'view_expenses', 'manage_expenses',
                    'view_tickets', 'manage_tickets',
                    'view_rti'
                ],
                isSystemRole: true
            },
            {
                name: 'employee',
                displayName: 'Employee',
                description: 'Standard user with view access to assigned features',
                permissions: [
                    'view_kpi', 'view_kpis',
                    'view_scores',
                    'view_projects',
                    'view_expenses',
                    'view_tickets'
                ],
                isSystemRole: true
            },
            {
                name: 'ippms_admin',
                displayName: 'iPPMS Administrator',
                description: 'iPPMS module administration access',
                permissions: [
                    'view_kpi', 'view_kpis', 'edit_kpis',
                    'view_scores', 'add_scores',
                    'view_projects', 'manage_projects',
                    'view_expenses',
                    'view_tickets'
                ],
                isSystemRole: true
            }
        ];

        for (const roleData of defaultRoles) {
            await Role.findOneAndUpdate(
                { name: roleData.name },
                roleData,
                { upsert: true, new: true }
            );
        }

        const roles = await Role.find().sort({ name: 1 });
        res.json({ message: 'Roles initialized successfully', roles });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
