import React, { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { api, Role } from "@/services/api";
import { PERMISSION_CATEGORIES } from "@/context/AccessControlContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Shield, Save, RefreshCw, ChevronLeft, Users, Check, X, Info, Loader2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const RoleManagement = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [modifiedRoles, setModifiedRoles] = useState<Record<string, string[]>>({});
    const [activeTab, setActiveTab] = useState<string>('');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Fetch roles on mount
    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            let fetchedRoles = await api.getRoles();

            // If no roles exist, initialize them
            if (fetchedRoles.length === 0) {
                const result = await api.initRoles();
                fetchedRoles = result.roles;
                toast({
                    title: "Roles Initialized",
                    description: "Default roles have been created.",
                });
            }

            setRoles(fetchedRoles);
            if (fetchedRoles.length > 0 && !activeTab) {
                setActiveTab(fetchedRoles[0]._id);
            }
        } catch (error) {
            console.error('Failed to fetch roles:', error);
            toast({
                title: "Error",
                description: "Failed to load roles. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const getPermissionsForRole = (roleId: string): string[] => {
        if (modifiedRoles[roleId]) {
            return modifiedRoles[roleId];
        }
        const role = roles.find(r => r._id === roleId);
        return role?.permissions || [];
    };

    const hasPermission = (roleId: string, permissionKey: string): boolean => {
        return getPermissionsForRole(roleId).includes(permissionKey);
    };

    const togglePermission = (roleId: string, permissionKey: string) => {
        const currentPermissions = getPermissionsForRole(roleId);
        let newPermissions: string[];

        if (currentPermissions.includes(permissionKey)) {
            newPermissions = currentPermissions.filter(p => p !== permissionKey);
        } else {
            newPermissions = [...currentPermissions, permissionKey];
        }

        setModifiedRoles(prev => ({
            ...prev,
            [roleId]: newPermissions
        }));
    };

    const hasUnsavedChanges = (roleId: string): boolean => {
        return !!modifiedRoles[roleId];
    };

    const saveRolePermissions = async (roleId: string) => {
        if (!modifiedRoles[roleId]) return;

        setSaving(roleId);
        try {
            await api.updateRolePermissions(roleId, modifiedRoles[roleId]);

            // Update local state
            setRoles(prev => prev.map(r =>
                r._id === roleId
                    ? { ...r, permissions: modifiedRoles[roleId] }
                    : r
            ));

            // Clear modified state for this role
            setModifiedRoles(prev => {
                const { [roleId]: _, ...rest } = prev;
                return rest;
            });

            toast({
                title: "Permissions Updated",
                description: "Role permissions have been saved successfully.",
            });
        } catch (error) {
            console.error('Failed to save permissions:', error);
            toast({
                title: "Error",
                description: "Failed to save permissions. Please try again.",
                variant: "destructive",
            });
        } finally {
            setSaving(null);
        }
    };

    const resetRolePermissions = (roleId: string) => {
        setModifiedRoles(prev => {
            const { [roleId]: _, ...rest } = prev;
            return rest;
        });
    };

    const getRoleIcon = (roleName: string) => {
        switch (roleName) {
            case 'admin':
                return <Shield className="w-5 h-5 text-red-500" />;
            case 'supervisor':
                return <Users className="w-5 h-5 text-blue-500" />;
            case 'employee':
                return <Users className="w-5 h-5 text-green-500" />;
            default:
                return <Shield className="w-5 h-5 text-purple-500" />;
        }
    };

    const getRoleBadgeVariant = (roleName: string) => {
        switch (roleName) {
            case 'admin':
                return 'destructive';
            case 'supervisor':
                return 'default';
            case 'employee':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-slate-50">
                <Header currentUser={user} onLogout={handleLogout} onLoginClick={() => { }} />
                <main className="flex-1 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        <span className="text-lg text-muted-foreground">Loading roles...</span>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header currentUser={user} onLogout={handleLogout} onLoginClick={() => { }} />

            <main className="flex-1 container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/dashboard/admin')}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Shield className="w-8 h-8 text-primary" />
                            Role & Permissions
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Configure access control for different user roles. Toggle permissions on/off to restrict or grant access.
                        </p>
                    </div>
                </div>

                {/* Role Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
                        {roles.map(role => (
                            <TabsTrigger
                                key={role._id}
                                value={role._id}
                                className="flex items-center gap-2"
                            >
                                {getRoleIcon(role.name)}
                                <span className="hidden sm:inline">{role.displayName}</span>
                                <span className="sm:hidden">{role.name.charAt(0).toUpperCase()}</span>
                                {hasUnsavedChanges(role._id) && (
                                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {roles.map(role => (
                        <TabsContent key={role._id} value={role._id} className="space-y-6">
                            {/* Role Header Card */}
                            <Card>
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-lg bg-primary/10">
                                                {getRoleIcon(role.name)}
                                            </div>
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    {role.displayName}
                                                    <Badge variant={getRoleBadgeVariant(role.name) as any}>
                                                        {role.isSystemRole ? 'System Role' : 'Custom'}
                                                    </Badge>
                                                </CardTitle>
                                                <CardDescription className="mt-1">
                                                    {role.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {hasUnsavedChanges(role._id) && (
                                                <>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => resetRolePermissions(role._id)}
                                                    >
                                                        <RefreshCw className="w-4 h-4 mr-2" />
                                                        Reset
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => saveRolePermissions(role._id)}
                                                        disabled={saving === role._id}
                                                    >
                                                        {saving === role._id ? (
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        ) : (
                                                            <Save className="w-4 h-4 mr-2" />
                                                        )}
                                                        Save Changes
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500" />
                                            <span>
                                                {getPermissionsForRole(role._id).length} permissions enabled
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <X className="w-4 h-4 text-red-500" />
                                            <span>
                                                {Object.values(PERMISSION_CATEGORIES).flat().length - getPermissionsForRole(role._id).length} permissions disabled
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Permission Categories */}
                            <div className="grid gap-6 md:grid-cols-2">
                                {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => (
                                    <Card key={category} className="overflow-hidden">
                                        <CardHeader className="bg-muted/50 py-4">
                                            <CardTitle className="text-base">{category}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="divide-y">
                                                {permissions.map(permission => (
                                                    <div
                                                        key={permission.key}
                                                        className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                                                    >
                                                        <div className="flex-1 pr-4">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-sm">
                                                                    {permission.label}
                                                                </span>
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <Info className="w-3.5 h-3.5 text-muted-foreground" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p>{permission.description}</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                                {permission.key}
                                                            </p>
                                                        </div>
                                                        <Switch
                                                            checked={hasPermission(role._id, permission.key)}
                                                            onCheckedChange={() => togglePermission(role._id, permission.key)}
                                                            className="data-[state=checked]:bg-green-500"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Floating Save Bar */}
                            {hasUnsavedChanges(role._id) && (
                                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                                    <Card className="shadow-lg border-orange-200 bg-orange-50">
                                        <CardContent className="flex items-center gap-4 p-4">
                                            <div className="flex items-center gap-2 text-orange-700">
                                                <Info className="w-5 h-5" />
                                                <span className="font-medium">You have unsaved changes</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => resetRolePermissions(role._id)}
                                                >
                                                    Discard
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => saveRolePermissions(role._id)}
                                                    disabled={saving === role._id}
                                                    className="bg-orange-600 hover:bg-orange-700"
                                                >
                                                    {saving === role._id ? (
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    ) : (
                                                        <Save className="w-4 h-4 mr-2" />
                                                    )}
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </main>

            <Footer />
        </div>
    );
};

export default RoleManagement;
