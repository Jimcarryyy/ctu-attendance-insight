
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Clock, Calendar, BarChart3, Search, CheckCircle, XCircle, Download } from "lucide-react";

const HRDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const attendanceStats = {
    present: 145,
    late: 12,
    absent: 8,
    onLeave: 5
  };

  const weeklyAttendanceData = [
    { day: 'Mon', present: 142, late: 8, absent: 5 },
    { day: 'Tue', present: 138, late: 12, absent: 5 },
    { day: 'Wed', present: 145, late: 6, absent: 4 },
    { day: 'Thu', present: 140, late: 10, absent: 5 },
    { day: 'Fri', present: 135, late: 15, absent: 5 },
  ];

  const departmentData = [
    { name: 'Computer Science', value: 45, color: '#4A7043' },
    { name: 'Engineering', value: 38, color: '#4B8FCE' },
    { name: 'Business', value: 32, color: '#6B7280' },
    { name: 'Arts & Sciences', value: 28, color: '#9CA3AF' },
  ];

  const employees = [
    { id: 'EMP001', name: 'Juan Dela Cruz', department: 'Computer Science', status: 'Present', timeIn: '8:02 AM' },
    { id: 'EMP002', name: 'Maria Santos', department: 'Engineering', status: 'Late', timeIn: '8:15 AM' },
    { id: 'EMP003', name: 'Robert Garcia', department: 'Business', status: 'Present', timeIn: '7:58 AM' },
    { id: 'EMP004', name: 'Ana Reyes', department: 'Arts & Sciences', status: 'On Leave', timeIn: '-' },
  ];

  const leaveRequests = [
    { id: 1, employee: 'Carlos Mendoza', type: 'Sick Leave', dates: 'Jul 10-12, 2025', status: 'Pending' },
    { id: 2, employee: 'Lisa Torres', type: 'Vacation', dates: 'Jul 15-16, 2025', status: 'Pending' },
    { id: 3, employee: 'Miguel Rodriguez', type: 'Personal', dates: 'Jul 8, 2025', status: 'Pending' },
  ];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLeaveAction = (requestId, action) => {
    console.log(`Leave request ${requestId} ${action}`);
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Present': 'bg-green-100 text-green-800',
      'Late': 'bg-yellow-100 text-yellow-800',
      'Absent': 'bg-red-100 text-red-800',
      'On Leave': 'bg-blue-100 text-blue-800'
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
              <BarChart3 className="h-8 w-8 text-green-700" />
              <span className="ml-2 text-2xl font-bold text-gray-900">CampusCog HR</span>
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
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'employees', name: 'Employees', icon: Users },
              { id: 'attendance', name: 'Attendance', icon: Clock },
              { id: 'leave', name: 'Leave Requests', icon: Calendar }
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
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Present Today</p>
                      <p className="text-3xl font-bold text-green-600">{attendanceStats.present}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
                      <p className="text-3xl font-bold text-yellow-600">{attendanceStats.late}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Absent</p>
                      <p className="text-3xl font-bold text-red-600">{attendanceStats.absent}</p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">On Leave</p>
                      <p className="text-3xl font-bold text-blue-600">{attendanceStats.onLeave}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Attendance Trends</CardTitle>
                  <CardDescription>Daily attendance patterns for this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyAttendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="present" stackId="a" fill="#4A7043" />
                      <Bar dataKey="late" stackId="a" fill="#EAB308" />
                      <Bar dataKey="absent" stackId="a" fill="#DC2626" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                  <CardDescription>Employee distribution across departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === 'employees' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time In
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                              <div className="text-sm text-gray-500">{employee.id}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {employee.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusBadge(employee.status)}>
                              {employee.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {employee.timeIn}
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

        {/* Leave Requests Tab */}
        {activeTab === 'leave' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Leave Request Management</h2>

            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900">{request.employee}</h3>
                          <Badge variant="outline">{request.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{request.dates}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleLeaveAction(request.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleLeaveAction(request.id, 'rejected')}
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;
