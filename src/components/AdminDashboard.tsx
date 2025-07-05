import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Users, Shield, Activity, Server, Database, Clock, Calendar, UserCheck, UserX, Download, Plus, Edit, RotateCcw, Save, FileText, AlertCircle, CheckCircle, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isViewUserModalOpen, setIsViewUserModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDTRModalOpen, setIsDTRModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    employeeId: '',
    department: '',
    role: 'Employee'
  });

  const [settings, setSettings] = useState({
    facialRecognitionSensitivity: 'medium',
    dataRetentionDays: 365,
    autoLogoutMinutes: 30,
    enableRemoteAccess: true,
    enableNotifications: true
  });

  // Mock data
  const systemStats = {
    totalUsers: 170,
    activeUsers: 145,
    systemUptime: '99.9%',
    avgResponseTime: '0.8s'
  };

  const userRoles = [
    { id: 1, name: 'Juan Dela Cruz', email: 'juan.delacruz@ctu.edu.ph', employeeId: 'EMP001', department: 'IT Services', role: 'Employee', status: 'Active' },
    { id: 2, name: 'Maria Santos', email: 'maria.santos@ctu.edu.ph', employeeId: 'HR001', department: 'Human Resources', role: 'HR Staff', status: 'Active' },
    { id: 3, name: 'Robert Garcia', email: 'robert.garcia@ctu.edu.ph', employeeId: 'ADM001', department: 'Administration', role: 'Admin', status: 'Active' },
    { id: 4, name: 'Ana Reyes', email: 'ana.reyes@ctu.edu.ph', employeeId: 'EMP004', department: 'Marketing', role: 'Employee', status: 'Inactive' },
  ];

  const auditLogs = [
    { id: 1, timestamp: '2025-07-02 09:15:23', user: 'maria.santos@ctu.edu.ph', action: 'Login', details: 'Successful login via facial recognition' },
    { id: 2, timestamp: '2025-07-02 09:10:45', user: 'juan.delacruz@ctu.edu.ph', action: 'Clock In', details: 'Attendance recorded' },
    { id: 3, timestamp: '2025-07-02 08:55:12', user: 'robert.garcia@ctu.edu.ph', action: 'Settings Change', details: 'Updated facial recognition sensitivity' },
    { id: 4, timestamp: '2025-07-02 08:30:08', user: 'ana.reyes@ctu.edu.ph', action: 'Leave Request', details: 'Submitted sick leave request' },
  ];

  // Mock attendance data
  const attendanceStats = {
    totalPresent: 142,
    totalAbsent: 28,
    lateArrivals: 15,
    earlyDepartures: 8
  };

  const todayAttendance = [
    { id: 1, name: 'Juan Dela Cruz', employeeId: 'EMP001', department: 'IT Services', timeIn: '08:00 AM', timeOut: '-', status: 'Present', location: 'Main Campus' },
    { id: 2, name: 'Maria Santos', employeeId: 'HR001', department: 'Human Resources', timeIn: '08:15 AM', timeOut: '-', status: 'Late', location: 'Main Campus' },
    { id: 3, name: 'Carlos Mendoza', employeeId: 'EMP003', department: 'Engineering', timeIn: '07:45 AM', timeOut: '05:30 PM', status: 'Present', location: 'Main Campus' },
    { id: 4, name: 'Ana Reyes', employeeId: 'EMP004', department: 'Marketing', timeIn: '-', timeOut: '-', status: 'Absent', location: '-' },
    { id: 5, name: 'Luis Fernandez', employeeId: 'EMP005', department: 'Finance', timeIn: '08:30 AM', timeOut: '-', status: 'Late', location: 'Remote' },
  ];

  const departmentAttendance = [
    { department: 'IT Services', present: 28, absent: 4, total: 32, rate: '87.5%' },
    { department: 'Human Resources', present: 15, absent: 2, total: 17, rate: '88.2%' },
    { department: 'Engineering', present: 45, absent: 8, total: 53, rate: '84.9%' },
    { department: 'Finance', present: 22, absent: 3, total: 25, rate: '88.0%' },
    { department: 'Marketing', present: 18, absent: 5, total: 23, rate: '78.3%' },
    { department: 'Administration', present: 14, absent: 6, total: 20, rate: '70.0%' },
  ];

  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings Updated",
      description: `${key} has been updated successfully.`,
    });
  };

  const handleExportReport = () => {
    setIsExportModalOpen(true);
  };

  const handleGenerateDTR = () => {
    setIsDTRModalOpen(true);
  };

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleDeleteUser = (userName) => {
    toast({
      title: "User Deleted",
      description: `${userName} has been successfully removed from the system.`,
      variant: "destructive"
    });
  };

  const handleResetPassword = (userName) => {
    toast({
      title: "Password Reset Sent",
      description: `Password reset email has been sent to ${userName}.`,
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "All system settings have been saved successfully.",
    });
  };

  const handleResetSettings = () => {
    setSettings({
      facialRecognitionSensitivity: 'medium',
      dataRetentionDays: 365,
      autoLogoutMinutes: 30,
      enableRemoteAccess: true,
      enableNotifications: true
    });
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  const handleConfirmExport = () => {
    setIsExportModalOpen(false);
    toast({
      title: "Export Started",
      description: "Attendance report is being generated and will be downloaded shortly.",
    });
  };

  const handleConfirmDTR = () => {
    setIsDTRModalOpen(false);
    toast({
      title: "DTR Generation Complete",
      description: "Daily Time Records have been generated for all employees.",
    });
  };

  const handleSaveNewUser = () => {
    if (!newUser.name || !newUser.email || !newUser.employeeId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAddUserModalOpen(false);
    toast({
      title: "User Added",
      description: `${newUser.name} has been successfully added to the system.`,
    });
    setNewUser({
      name: '',
      email: '',
      employeeId: '',
      department: '',
      role: 'Employee'
    });
  };

  const handleSaveEditUser = () => {
    setIsEditUserModalOpen(false);
    toast({
      title: "User Updated",
      description: `${selectedUser?.name}'s information has been updated successfully.`,
    });
    setSelectedUser(null);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsViewUserModalOpen(true);
  };

  const getRoleBadge = (role) => {
    const styles = {
      'Admin': 'bg-red-100 text-red-800',
      'HR Staff': 'bg-blue-100 text-blue-800',
      'Employee': 'bg-green-100 text-green-800'
    };
    return styles[role] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Present': 'bg-green-100 text-green-800',
      'Late': 'bg-yellow-100 text-yellow-800',
      'Absent': 'bg-red-100 text-red-800',
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

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
              { id: 'overview', name: 'Overview', icon: Activity },
              { id: 'attendance', name: 'Attendance Overview', icon: Clock },
              { id: 'users', name: 'User Management', icon: Users },
              { id: 'settings', name: 'System Settings', icon: Settings },
              { id: 'audit', name: 'Audit Logs', icon: Database }
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
          <div className="space-y-8">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-blue-600">{systemStats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-3xl font-bold text-green-600">{systemStats.activeUsers}</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">System Uptime</p>
                      <p className="text-3xl font-bold text-green-600">{systemStats.systemUptime}</p>
                    </div>
                    <Server className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Response</p>
                      <p className="text-3xl font-bold text-blue-600">{systemStats.avgResponseTime}</p>
                    </div>
                    <Database className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current system status and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Facial Recognition API</span>
                      <Badge className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Database Connection</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Cloud Storage</span>
                      <Badge className="bg-green-100 text-green-800">Available</Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Backup Status</span>
                      <Badge className="bg-green-100 text-green-800">Up to Date</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Security Alerts</span>
                      <Badge className="bg-gray-100 text-gray-800">None</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Last Maintenance</span>
                      <span className="text-sm text-gray-500">July 1, 2025</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Attendance Overview Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Attendance Overview</h2>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  onClick={handleExportReport}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleGenerateDTR}
                >
                  Generate DTR
                </Button>
              </div>
            </div>

            {/* Attendance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Present Today</p>
                      <p className="text-3xl font-bold text-green-600">{attendanceStats.totalPresent}</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Absent Today</p>
                      <p className="text-3xl font-bold text-red-600">{attendanceStats.totalAbsent}</p>
                    </div>
                    <UserX className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
                      <p className="text-3xl font-bold text-yellow-600">{attendanceStats.lateArrivals}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Early Departures</p>
                      <p className="text-3xl font-bold text-orange-600">{attendanceStats.earlyDepartures}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Attendance */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Attendance</CardTitle>
                <CardDescription>Real-time attendance tracking for July 2, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Time In</TableHead>
                      <TableHead>Time Out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAttendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{record.name}</div>
                            <div className="text-sm text-gray-500">{record.employeeId}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{record.department}</TableCell>
                        <TableCell className="text-gray-900">{record.timeIn}</TableCell>
                        <TableCell className="text-gray-900">{record.timeOut}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">{record.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Department Attendance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Department Attendance Summary</CardTitle>
                <CardDescription>Attendance rates by department for today</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Attendance Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentAttendance.map((dept, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-gray-900">{dept.department}</TableCell>
                        <TableCell className="text-green-600 font-medium">{dept.present}</TableCell>
                        <TableCell className="text-red-600 font-medium">{dept.absent}</TableCell>
                        <TableCell className="text-gray-900">{dept.total}</TableCell>
                        <TableCell>
                          <Badge className={parseFloat(dept.rate) >= 85 ? 'bg-green-100 text-green-800' : parseFloat(dept.rate) >= 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                            {dept.rate}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">User Role Management</h2>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleAddUser}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
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
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userRoles.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                              <div className="text-xs text-gray-400">{user.employeeId}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getRoleBadge(user.role)}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusBadge(user.status)}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => handleViewDetails(user)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-green-600 hover:text-green-800 ml-1"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-orange-600 hover:text-orange-800 ml-1"
                              onClick={() => handleResetPassword(user.name)}
                            >
                              <RotateCcw className="w-4 h-4 mr-1" />
                              Reset
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-800 ml-1"
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                                    Delete User Account
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete <strong>{user.name}</strong>'s account? 
                                    This action cannot be undone and will permanently remove all user data, 
                                    attendance records, and access permissions.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteUser(user.name)}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete User
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">System Configuration</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Facial Recognition Settings</CardTitle>
                  <CardDescription>Configure AI recognition parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sensitivity">Recognition Sensitivity</Label>
                    <Select 
                      value={settings.facialRecognitionSensitivity} 
                      onValueChange={(value) => handleSettingsChange('facialRecognitionSensitivity', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (More permissive)</SelectItem>
                        <SelectItem value="medium">Medium (Recommended)</SelectItem>
                        <SelectItem value="high">High (More strict)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="remoteAccess">Enable Remote Access</Label>
                      <p className="text-sm text-gray-500">Allow employees to clock in remotely</p>
                    </div>
                    <Switch
                      id="remoteAccess"
                      checked={settings.enableRemoteAccess}
                      onCheckedChange={(checked) => handleSettingsChange('enableRemoteAccess', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure system security parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="autoLogout">Auto Logout (minutes)</Label>
                    <Input
                      id="autoLogout"
                      type="number"
                      value={settings.autoLogoutMinutes}
                      onChange={(e) => handleSettingsChange('autoLogoutMinutes', parseInt(e.target.value) || 30)}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dataRetention">Data Retention (days)</Label>
                    <Input
                      id="dataRetention"
                      type="number"
                      value={settings.dataRetentionDays}
                      onChange={(e) => handleSettingsChange('dataRetentionDays', parseInt(e.target.value) || 365)}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications">Enable Notifications</Label>
                      <p className="text-sm text-gray-500">System alerts and updates</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={settings.enableNotifications}
                      onCheckedChange={(checked) => handleSettingsChange('enableNotifications', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={handleResetSettings}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSaveSettings}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {/* Audit Logs Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">System Audit Logs</h2>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auditLogs.map((log) => (
                        <tr key={log.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.timestamp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">
                              {log.action}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {log.details}
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
      </div>

      {/* Add User Modal */}
      <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-green-600" />
              Add New User
            </DialogTitle>
            <DialogDescription>
              Create a new user account in the CampusCog system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Full Name
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                className="col-span-3"
                placeholder="Enter full name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                className="col-span-3"
                placeholder="user@ctu.edu.ph"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employeeId" className="text-right">
                Employee ID
              </Label>
              <Input
                id="employeeId"
                value={newUser.employeeId}
                onChange={(e) => setNewUser(prev => ({ ...prev, employeeId: e.target.value }))}
                className="col-span-3"
                placeholder="EMP001"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Select value={newUser.department} onValueChange={(value) => setNewUser(prev => ({ ...prev, department: value }))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT Services">IT Services</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="HR Staff">HR Staff</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddUserModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewUser} className="bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Edit className="w-5 h-5 mr-2 text-blue-600" />
              Edit User: {selectedUser?.name}
            </DialogTitle>
            <DialogDescription>
              Update user information and role permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editName" className="text-right">
                Full Name
              </Label>
              <Input
                id="editName"
                value={selectedUser?.name || ''}
                className="col-span-3"
                placeholder="Enter full name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editEmail" className="text-right">
                Email
              </Label>
              <Input
                id="editEmail"
                type="email"
                value={selectedUser?.email || ''}
                className="col-span-3"
                placeholder="user@ctu.edu.ph"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editDepartment" className="text-right">
                Department
              </Label>
              <Select value={selectedUser?.department || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT Services">IT Services</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editRole" className="text-right">
                Role
              </Label>
              <Select value={selectedUser?.role || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="HR Staff">HR Staff</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editStatus" className="text-right">
                Status
              </Label>
              <Select value={selectedUser?.status || ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditUserModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditUser} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Report Modal */}
      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Download className="w-5 h-5 mr-2 text-blue-600" />
              Export Attendance Report
            </DialogTitle>
            <DialogDescription>
              Choose the report format and date range for export.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="format" className="text-right">
                Format
              </Label>
              <Select defaultValue="pdf">
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateRange" className="text-right">
                Date Range
              </Label>
              <Select defaultValue="today">
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsExportModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmExport} className="bg-blue-600 hover:bg-blue-700 text-white">
              <FileText className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Generate DTR Modal */}
      <Dialog open={isDTRModalOpen} onOpenChange={setIsDTRModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Generate Daily Time Records
            </DialogTitle>
            <DialogDescription>
              Generate DTR for all employees for the selected period.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dtrPeriod" className="text-right">
                Period
              </Label>
              <Select defaultValue="today">
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="payroll">Payroll Period</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dtrDepartment" className="text-right">
                Department
              </Label>
              <Select defaultValue="all">
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="IT Services">IT Services</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 col-span-4">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-gray-600">This will generate DTR for all selected employees.</span>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDTRModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmDTR} className="bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="w-4 h-4 mr-2" />
              Generate DTR
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View User Details Modal */}
      <Dialog open={isViewUserModalOpen} onOpenChange={setIsViewUserModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-blue-600" />
              User Details: {selectedUser?.name}
            </DialogTitle>
            <DialogDescription>
              Detailed information for this user account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                  <p className="text-lg font-semibold text-gray-900">{selectedUser?.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email Address</Label>
                  <p className="text-gray-900">{selectedUser?.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Employee ID</Label>
                  <p className="text-gray-900 font-mono">{selectedUser?.employeeId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Department</Label>
                  <p className="text-gray-900">{selectedUser?.department}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Role</Label>
                  <div className="mt-1">
                    <Badge className={getRoleBadge(selectedUser?.role || '')}>
                      {selectedUser?.role}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <div className="mt-1">
                    <Badge className={getStatusBadge(selectedUser?.status || '')}>
                      {selectedUser?.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Date Created</Label>
                  <p className="text-gray-900">July 1, 2025</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Last Login</Label>
                  <p className="text-gray-900">July 2, 2025 - 09:15 AM</p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <Label className="text-sm font-medium text-gray-600">Recent Activity</Label>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Last Clock In</span>
                  <span className="text-gray-900">Today, 08:00 AM</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Attendance Rate (This Month)</span>
                  <span className="text-green-600 font-medium">95.5%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total Leave Days Used</span>
                  <span className="text-gray-900">3 out of 15</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <Label className="text-sm font-medium text-gray-600">Permissions & Access</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Facial Recognition Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Mobile App Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedUser?.role === 'Admin' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">Admin Dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedUser?.role === 'HR Staff' || selectedUser?.role === 'Admin' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">HR Features</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsViewUserModalOpen(false)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                setIsViewUserModalOpen(false);
                handleEditUser(selectedUser);
              }} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit User
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
