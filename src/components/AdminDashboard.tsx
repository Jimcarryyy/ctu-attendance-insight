import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Shield, Users, Activity, FileText, Search, Eye, Edit, Trash2, UserPlus, CheckCircle, XCircle, AlertCircle, Clock, Download, Database, AlertTriangle, RefreshCw, LayoutDashboard, Settings, BarChart3 } from "lucide-react";
import SystemSettings from './SystemSettings';
import ReportsAnalytics from './ReportsAnalytics';
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showReports, setShowReports] = useState(false);
  
  // New modal states
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);

  // Mock data
  const [usersData, setUsersData] = useState([
    { id: 'USER001', name: 'Alice Johnson', role: 'employee', department: 'Computer Science', status: 'Active' },
    { id: 'USER002', name: 'Bob Smith', role: 'hr', department: 'HR', status: 'Active' },
    { id: 'USER003', name: 'Charlie Brown', role: 'employee', department: 'Engineering', status: 'Inactive' },
    { id: 'USER004', name: 'Diana Miller', role: 'employee', department: 'Business', status: 'Active' },
  ]);

  const systemHealthData = [
    { name: 'CPU Usage', value: 75 },
    { name: 'Memory Usage', value: 60 },
    { name: 'Disk Space', value: 80 },
    { name: 'Network Traffic', value: 40 },
  ];

  const auditLogsData = [
    { id: 1, user: 'Alice Johnson', action: 'Login', timestamp: '2025-07-09 10:00 AM', status: 'Success' },
    { id: 2, user: 'Bob Smith', action: 'Logout', timestamp: '2025-07-09 10:15 AM', status: 'Success' },
    { id: 3, user: 'Charlie Brown', action: 'Failed Login', timestamp: '2025-07-09 10:20 AM', status: 'Failed' },
  ];

  const { toast } = useToast();

  const handleOpenUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsersData(usersData.map(user => user.id === updatedUser.id ? updatedUser : user));
    handleCloseUserModal();
    toast({
      title: "User Updated",
      description: "User details have been updated successfully.",
    });
  };

  const handleDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsersData(usersData.filter(user => user.id !== userToDelete.id));
      setShowDeleteDialog(false);
      setUserToDelete(null);
      toast({
        title: "User Deleted",
        description: "User has been successfully deleted.",
      });
    }
  };

  const handleCreateUser = (newUser) => {
    setUsersData([...usersData, newUser]);
    handleCloseUserModal();
    toast({
      title: "User Created",
      description: "New user has been created successfully.",
    });
  };

  // New backup and security functions
  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    setShowBackupModal(true);
    
    // Simulate backup creation
    setTimeout(() => {
      setIsCreatingBackup(false);
      setShowBackupModal(false);
      toast({
        title: "Backup Created",
        description: "Manual backup has been created successfully.",
      });
    }, 3000);
  };

  const handleScheduleBackup = () => {
    setShowScheduleModal(false);
    toast({
      title: "Backup Scheduled",
      description: "Automatic backup has been scheduled successfully.",
    });
  };

  const handleViewSecurityReport = () => {
    setShowSecurityModal(true);
  };

  const handleRestoreBackup = (backup) => {
    setSelectedBackup(backup);
    setShowRestoreModal(true);
  };

  const confirmRestore = () => {
    setShowRestoreModal(false);
    toast({
      title: "Restore Initiated",
      description: `Restoring from backup: ${selectedBackup?.date}`,
    });
  };

  if (showSettings) {
    return <SystemSettings onBack={() => setShowSettings(false)} />;
  }

  if (showReports) {
    return <ReportsAnalytics onBack={() => setShowReports(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-700" />
              <span className="ml-2 text-2xl font-bold text-gray-900">CampusCog Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowReports(true)}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Reports
              </Button>
              <Button
                onClick={() => setShowSettings(true)}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <span className="text-sm text-gray-700">Welcome, {user.name}</span>
              <Button
                variant="outline"
                onClick={onLogout}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: LayoutDashboard },
              { id: 'users', name: 'User Management', icon: Users },
              { id: 'system', name: 'System Health', icon: Activity },
              { id: 'audit', name: 'Audit Logs', icon: FileText },
              { id: 'backup', name: 'Backup & Security', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-green-600">{usersData.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-3xl font-bold text-blue-600">{usersData.filter(user => user.status === 'Active').length}</p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">System Uptime</p>
                      <p className="text-3xl font-bold text-yellow-600">99.9%</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Security Score</p>
                      <p className="text-3xl font-bold text-red-600">A</p>
                    </div>
                    <Shield className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <Button onClick={() => handleOpenUserModal(null)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search users..." className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500" />
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {usersData.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button onClick={() => handleOpenUserModal(user)} size="icon" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button onClick={() => handleOpenUserModal(user)} size="icon" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button onClick={() => handleDeleteConfirmation(user)} size="icon" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">System Health</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Monitoring</CardTitle>
                  <CardDescription>Real-time system resource usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={systemHealthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Statistics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">99.9%</div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">24/7</div>
                      <div className="text-sm text-gray-600">Service Availability</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-700">200ms</div>
                      <div className="text-sm text-gray-600">Average Response Time</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-700">0</div>
                      <div className="text-sm text-gray-600">Critical Errors</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Audit Logs Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auditLogsData.map((log) => (
                        <tr key={log.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{log.user}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.timestamp}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {log.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Backup & Security Tab */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Backup & Security</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2 text-green-700" />
                    Database Backup
                  </CardTitle>
                  <CardDescription>Manage system backups and data recovery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">Last Backup</p>
                      <p className="text-sm text-green-600">July 9, 2025 at 3:00 AM</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <Button onClick={handleCreateBackup} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Create Manual Backup
                    </Button>
                    <Button onClick={() => setShowScheduleModal(true)} variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100">
                      <Clock className="w-4 h-4 mr-2" />
                      Schedule Automatic Backup
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-700" />
                    Security Status
                  </CardTitle>
                  <CardDescription>System security and compliance monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">SSL Certificate</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">Valid</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Firewall Status</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">Active</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Data Encryption</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">Enabled</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Access Logs</span>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-600">3 Failed Attempts</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleViewSecurityReport} variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    View Security Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Data Recovery Options</CardTitle>
                <CardDescription>Available backup files and restoration options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: 'July 9, 2025 - 3:00 AM', size: '145 MB', type: 'Automatic' },
                    { date: 'July 8, 2025 - 3:00 AM', size: '142 MB', type: 'Automatic' },
                    { date: 'July 7, 2025 - 3:00 AM', size: '140 MB', type: 'Automatic' },
                    { date: 'July 6, 2025 - 2:30 PM', size: '138 MB', type: 'Manual' },
                  ].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{backup.date}</p>
                        <p className="text-sm text-gray-600">{backup.size} • {backup.type} Backup</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button onClick={() => handleRestoreBackup(backup)} size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Restore
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* User Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedUser ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogDescription>
              {selectedUser ? 'Update user details' : 'Create a new user account'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={selectedUser?.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select>
                <SelectTrigger className="col-span-3" data-testid="role-select">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                defaultValue={selectedUser?.department}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select>
                <SelectTrigger className="col-span-3" data-testid="status-select">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCloseUserModal} variant="secondary">
              Cancel
            </Button>
            <Button onClick={() => {
              const nameInput = document.getElementById('name') as HTMLInputElement;
              const roleSelect = document.querySelector('[data-testid="role-select"]') as HTMLSelectElement;
              const departmentInput = document.getElementById('department') as HTMLInputElement;
              const statusSelect = document.querySelector('[data-testid="status-select"]') as HTMLSelectElement;

              const name = nameInput?.value || '';
              const role = roleSelect?.value || 'employee';
              const department = departmentInput?.value || '';
              const status = statusSelect?.value || 'active';

              const updatedUser = {
                id: selectedUser ? selectedUser.id : `USER${Math.floor(Math.random() * 1000)}`,
                name: name,
                role: role,
                department: department,
                status: status
              };

              if (selectedUser) {
                handleUpdateUser(updatedUser);
              } else {
                handleCreateUser(updatedUser);
              }
            }} type="submit">
              {selectedUser ? 'Update User' : 'Create User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Backup Creation Modal */}
      <Dialog open={showBackupModal} onOpenChange={setShowBackupModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Creating Backup</DialogTitle>
            <DialogDescription>
              Please wait while we create a manual backup of your system data.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            {isCreatingBackup ? (
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-gray-600">Creating backup...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-600">Backup completed!</span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Backup Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Automatic Backup</DialogTitle>
            <DialogDescription>
              Configure automatic backup settings for your system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                defaultValue="03:00"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="retention" className="text-right">
                Retention
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowScheduleModal(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleScheduleBackup} type="submit">
              Schedule Backup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Security Report Modal */}
      <Dialog open={showSecurityModal} onOpenChange={setShowSecurityModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Security Report</DialogTitle>
            <DialogDescription>
              Detailed security analysis and recommendations for your system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Security Score: A</span>
                </div>
                <p className="text-sm text-green-600 mt-1">Excellent security posture</p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">3 Failed Logins</span>
                </div>
                <p className="text-sm text-yellow-600 mt-1">Monitor suspicious activity</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Security Checks</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm">SSL/TLS Configuration</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm">Password Policy Compliance</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm">Two-Factor Authentication</span>
                  <XCircle className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm">Data Encryption</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSecurityModal(false)} variant="secondary">
              Close
            </Button>
            <Button onClick={() => {
              setShowSecurityModal(false);
              toast({
                title: "Security Report",
                description: "Full security report has been downloaded.",
              });
            }}>
              Download Full Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restore Backup Modal */}
      <AlertDialog open={showRestoreModal} onOpenChange={setShowRestoreModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore from Backup</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to restore from backup "{selectedBackup?.date}"? This action will overwrite current data and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowRestoreModal(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRestore} className="bg-green-600 hover:bg-green-700 text-white">
              Restore Backup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
