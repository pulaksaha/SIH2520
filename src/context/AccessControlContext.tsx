import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

// Define permissions for different actions in the system
export type Permission =
  | 'view_kpi'
  | 'view_kpis'
  | 'edit_kpis'
  | 'view_scores'
  | 'add_scores'
  | 'view_projects'
  | 'manage_projects'
  | 'view_expenses'
  | 'manage_expenses'
  | 'view_tickets'
  | 'manage_tickets'
  | 'view_rti'
  | 'manage_rti'
  | 'view_users'
  | 'manage_users'
  | 'manage_roles'
  | 'view_logs';

// All available permissions grouped by category
export const PERMISSION_CATEGORIES = {
  'KPI Management': [
    { key: 'view_kpi', label: 'View KPI Dashboard', description: 'Access KPI dashboard and metrics' },
    { key: 'view_kpis', label: 'View KPIs', description: 'View KPI definitions and list' },
    { key: 'edit_kpis', label: 'Edit KPIs', description: 'Create, edit, and delete KPI templates' },
  ],
  'Performance Scores': [
    { key: 'view_scores', label: 'View Scores', description: 'View performance scores' },
    { key: 'add_scores', label: 'Add Scores', description: 'Add and update performance scores' },
  ],
  'Project Management': [
    { key: 'view_projects', label: 'View Projects', description: 'View project details and status' },
    { key: 'manage_projects', label: 'Manage Projects', description: 'Create, edit, and manage projects' },
  ],
  'Expense Management': [
    { key: 'view_expenses', label: 'View Expenses', description: 'View expense records' },
    { key: 'manage_expenses', label: 'Manage Expenses', description: 'Approve and manage expenses' },
  ],
  'Ticket System': [
    { key: 'view_tickets', label: 'View Tickets', description: 'View support tickets' },
    { key: 'manage_tickets', label: 'Manage Tickets', description: 'Assign and resolve tickets' },
  ],
  'RTI Portal': [
    { key: 'view_rti', label: 'View RTI', description: 'View RTI requests and responses' },
    { key: 'manage_rti', label: 'Manage RTI', description: 'Process RTI requests' },
  ],
  'Administration': [
    { key: 'view_users', label: 'View Users', description: 'View user list and details' },
    { key: 'manage_users', label: 'Manage Users', description: 'Create, edit, and delete users' },
    { key: 'manage_roles', label: 'Manage Roles', description: 'Configure role permissions' },
    { key: 'view_logs', label: 'View Logs', description: 'Access system audit logs' },
  ],
};

// Role-based permission mapping (fallback/default)
const rolePermissions: Record<string, Permission[]> = {
  admin: [
    'view_kpi', 'view_kpis', 'edit_kpis',
    'view_scores', 'add_scores',
    'view_projects', 'manage_projects',
    'view_expenses', 'manage_expenses',
    'view_tickets', 'manage_tickets',
    'view_rti', 'manage_rti',
    'view_users', 'manage_users',
    'manage_roles', 'view_logs'
  ],
  supervisor: [
    'view_kpi', 'view_kpis',
    'view_scores', 'add_scores',
    'view_projects', 'manage_projects',
    'view_expenses', 'manage_expenses',
    'view_tickets', 'manage_tickets',
    'view_rti'
  ],
  employee: [
    'view_kpi', 'view_kpis',
    'view_scores',
    'view_projects',
    'view_expenses',
    'view_tickets'
  ],
  ippms_admin: [
    'view_kpi', 'view_kpis', 'edit_kpis',
    'view_scores', 'add_scores',
    'view_projects', 'manage_projects',
    'view_expenses',
    'view_tickets'
  ]
};

interface AccessControlContextType {
  hasPermission: (permission: Permission) => boolean;
  userRole: string | null;
}

const AccessControlContext = createContext<AccessControlContextType | undefined>(undefined);

export const AccessControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;

    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permission);
  };

  return (
    <AccessControlContext.Provider
      value={{
        hasPermission,
        userRole: user?.role || null,
      }}
    >
      {children}
    </AccessControlContext.Provider>
  );
};

export const useAccessControl = (): AccessControlContextType => {
  const context = useContext(AccessControlContext);
  if (context === undefined) {
    throw new Error('useAccessControl must be used within an AccessControlProvider');
  }
  return context;
};

// Higher-order component to protect routes based on permissions
export const withPermission = (
  Component: React.ComponentType<any>,
  requiredPermission: Permission
) => {
  return (props: any) => {
    const { hasPermission } = useAccessControl();

    if (!hasPermission(requiredPermission)) {
      return <div>You don't have permission to access this page.</div>;
    }

    return <Component {...props} />;
  };
};