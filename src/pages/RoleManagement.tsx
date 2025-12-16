import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RoleManagement = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header onLoginClick={() => { }} />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Role & Permissions</h1>
                <p className="text-muted-foreground mb-8">Manage system roles and access levels</p>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader><CardTitle>Defined Roles</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {['Admin', 'Supervisor', 'Employee'].map(role => (
                                    <div key={role} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <h3 className="font-semibold">{role}</h3>
                                            <p className="text-sm text-gray-500">Default permissions applied</p>
                                        </div>
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">System Default</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RoleManagement;
