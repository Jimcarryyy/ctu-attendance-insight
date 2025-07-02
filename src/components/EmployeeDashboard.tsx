
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Clock, Calendar, User, Download, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const EmployeeDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isClockingIn, setIsClockingIn] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Mock data
  const attendanceData = [
    { date: '2025-07-02', timeIn: '08:02 AM', timeOut: '05:15 PM', status: 'Present' },
    { date: '2025-07-01', timeIn: '08:05 AM', timeOut: '05:10 PM', status: 'Present' },
    { date: '2025-06-30', timeIn: '08:15 AM', timeOut: '05:20 PM', status: 'Late' },
  ];

  const leaveRequests = [
    { id: 1, type: 'Sick Leave', dates: 'Jul 10-12, 2025', status: 'Pending', reason: 'Medical checkup' },
    { id: 2, type: 'Vacation', dates: 'Jun 25-26, 2025', status: 'Approved', reason: 'Family vacation' },
  ];

  const handleClockInOut = async () => {
    setIsClockingIn(true);
    // Simulate facial recognition process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsClockingIn(false);
    // In a real app, this would update the attendance record
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    console.log('Leave request submitted:', leaveForm);
    // Reset form
    setLeaveForm({ type: '', startDate: '', endDate: '', reason: '' });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'Pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Camera className="h-8 w-8 text-green-700" />
              <span className="ml-2 text-2xl font-bold text-gray-900">CampusCog</span>
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
              { id: 'overview', name: 'Overview', icon: User },
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-700" />
                  Profile Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-10 h-10 text-green-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">Employee ID: {user.id}</p>
                  <p className="text-gray-600">Department: Computer Science</p>
                  <p className="text-gray-600">Position: Faculty Member</p>
                </div>
              </CardContent>
            </Card>

            {/* Clock In/Out Interface */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-green-700" />
                  Clock In/Out
                </CardTitle>
                <CardDescription>
                  Last recorded: Clock-In at 8:02 AM, July 2, 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <div className="w-40 h-40 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                    {isClockingIn ? (
                      <div className="animate-pulse">
                        <Camera className="w-20 h-20 text-green-600" />
                      </div>
                    ) : (
                      <Camera className="w-20 h-20 text-gray-400" />
                    )}
                  </div>
                  
                  {isClockingIn ? (
                    <div className="space-y-2">
                      <p className="text-blue-600 font-medium">Analyzing facial features...</p>
                      <p className="text-sm text-gray-600">Please look directly at the camera</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Click the button below to clock in or out using facial recognition
                      </p>
                      <Button
                        onClick={handleClockInOut}
                        className="bg-green-700 hover:bg-green-800 text-white px-8 py-3"
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Clock In/Out
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Daily Time Records</h2>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                <Download className="w-4 h-4 mr-2" />
                Export DTR
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time In
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time Out
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendanceData.map((record, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {record.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {record.timeIn}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {record.timeOut}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              record.status === 'Present' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {record.status}
                            </span>
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

        {/* Leave Tab */}
        {activeTab === 'leave' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Leave Request Form */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Leave Request</CardTitle>
                <CardDescription>
                  Submit a new leave request for approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLeaveSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="leaveType">Leave Type</Label>
                    <Select value={leaveForm.type} onValueChange={(value) => setLeaveForm({...leaveForm, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="vacation">Vacation Leave</SelectItem>
                        <SelectItem value="personal">Personal Leave</SelectItem>
                        <SelectItem value="emergency">Emergency Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={leaveForm.startDate}
                        onChange={(e) => setLeaveForm({...leaveForm, startDate: e.target.value})}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={leaveForm.endDate}
                        onChange={(e) => setLeaveForm({...leaveForm, endDate: e.target.value})}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reason">Reason</Label>
                    <Textarea
                      id="reason"
                      placeholder="Explain the reason for your leave request"
                      value={leaveForm.reason}
                      onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Submit Leave Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Leave Status */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Request Status</CardTitle>
                <CardDescription>
                  Track the status of your submitted leave requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{request.type}</h4>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(request.status)}
                              <span className={`text-sm font-medium ${
                                request.status === 'Approved' ? 'text-green-600' :
                                request.status === 'Rejected' ? 'text-red-600' :
                                'text-yellow-600'
                              }`}>
                                {request.status}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{request.dates}</p>
                          <p className="text-sm text-gray-500 mt-1">{request.reason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
