import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SystemLogs = () => {
    const logs = [
        { id: 1, action: "User Login", user: "admin@example.com", time: "2 mins ago", type: "info" },
        { id: 2, action: "Project Created", user: "supervisor@example.com", time: "1 hour ago", type: "success" },
        { id: 3, action: "Failed Login Attempt", user: "bad@actor.com", time: "2 hours ago", type: "warning" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header onLoginClick={() => { }} />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">System Logs</h1>
                <p className="text-muted-foreground mb-8">Audit trail of system activities</p>

                <Card>
                    <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {logs.map(log => (
                                <div key={log.id} className="flex justify-between items-center p-3 border-b last:border-0">
                                    <div>
                                        <p className="font-medium">{log.action}</p>
                                        <p className="text-sm text-gray-500">{log.user}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs px-2 py-1 rounded ${log.type === 'warning' ? 'bg-red-100 text-red-800' :
                                                log.type === 'success' ? 'bg-green-100 text-green-800' :
                                                    'bg-blue-100 text-blue-800'
                                            }`}>
                                            {log.type.toUpperCase()}
                                        </span>
                                        <p className="text-xs text-gray-400 mt-1">{log.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default SystemLogs;
