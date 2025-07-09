
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Download, Calendar, Filter, TrendingUp, Users, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportsAnalytics = ({ onBack }) => {
  const { toast } = useToast();
  const [reportFilters, setReportFilters] = useState({
    department: 'all',
    dateRange: 'last30days',
    reportType: 'attendance'
  });

  // Mock data for reports
  const attendanceTrends = [
    { month: 'Jan', present: 95, late: 8, absent: 5 },
    { month: 'Feb', present: 92, late: 12, absent: 8 },
    { month: 'Mar', present: 97, late: 6, absent: 3 },
    { month: 'Apr', present: 94, late: 10, absent: 6 },
    { month: 'May', present: 96, late: 7, absent: 4 },
    { month: 'Jun', present: 93, late: 11, absent: 7 },
  ];

  const departmentAttendance = [
    { name: 'Computer Science', attendance: 96, color: '#4A7043' },
    { name: 'Engineering', attendance: 94, color: '#4B8FCE' },
    { name: 'Business', attendance: 92, color: '#6B7280' },
    { name: 'Arts & Sciences', attendance: 90, color: '#9CA3AF' },
  ];

  const leaveAnalytics = [
    { type: 'Sick Leave', count: 24, approved: 22, pending: 2, rejected: 0 },
    { type: 'Vacation Leave', count: 45, approved: 40, pending: 3, rejected: 2 },
    { type: 'Personal Leave', count: 18, approved: 15, pending: 2, rejected: 1 },
    { type: 'Emergency Leave', count: 8, approved: 8, pending: 0, rejected: 0 },
  ];

  const productivityMetrics = [
    { metric: 'Average Hours/Day', value: '8.2', change: '+0.3' },
    { metric: 'On-Time Arrival Rate', value: '87%', change: '+5%' },
    { metric: 'Early Departures', value: '12%', change: '-2%' },
    { metric: 'Overtime Hours', value: '156', change: '+12' },
  ];

  const handleExportReport = (reportType) => {
    console.log(`Exporting ${reportType} report with filters:`, reportFilters);
    toast({
      title: "Report Exported",
      description: `${reportType} report has been exported successfully.`,
    });
  };

  const handleGenerateReport = () => {
    console.log('Generating custom report with filters:', reportFilters);
    toast({
      title: "Report Generated",
      description: "Custom report has been generated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-700" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Reports & Analytics</span>
            </div>
            <Button
              variant="outline"
              onClick={onBack}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="attendance-reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="attendance-reports">Attendance Reports</TabsTrigger>
            <TabsTrigger value="leave-analytics">Leave Analytics</TabsTrigger>
            <TabsTrigger value="productivity">Productivity Metrics</TabsTrigger>
            <TabsTrigger value="custom-reports">Custom Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance-reports">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Attendance Analysis</h2>
                <Button
                  onClick={() => handleExportReport('Attendance')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Attendance Trends</CardTitle>
                    <CardDescription>Attendance patterns over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={attendanceTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="present" stroke="#4A7043" strokeWidth={2} />
                        <Line type="monotone" dataKey="late" stroke="#EAB308" strokeWidth={2} />
                        <Line type="monotone" dataKey="absent" stroke="#DC2626" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Department Attendance Rates</CardTitle>
                    <CardDescription>Average attendance by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={departmentAttendance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="attendance" fill="#4A7043" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Attendance Summary</CardTitle>
                  <CardDescription>Key attendance statistics for the current period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">94.2%</div>
                      <div className="text-sm text-gray-600">Overall Attendance</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-700">8.7%</div>
                      <div className="text-sm text-gray-600">Late Arrivals</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-700">5.1%</div>
                      <div className="text-sm text-gray-600">Absences</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">2.0%</div>
                      <div className="text-sm text-gray-600">On Leave</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leave-analytics">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Leave Analytics</h2>
                <Button
                  onClick={() => handleExportReport('Leave')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Leave Request Analysis</CardTitle>
                  <CardDescription>Breakdown of leave requests by type and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Leave Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Requests
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Approved
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pending
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rejected
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Approval Rate
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {leaveAnalytics.map((leave, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {leave.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {leave.count}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              {leave.approved}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                              {leave.pending}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                              {leave.rejected}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {Math.round((leave.approved / leave.count) * 100)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="productivity">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Productivity Metrics</h2>
                <Button
                  onClick={() => handleExportReport('Productivity')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {productivityMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                          <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                          <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change} from last month
                          </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Productivity Insights</CardTitle>
                  <CardDescription>Key findings and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800">Positive Trends</h4>
                      <ul className="mt-2 text-sm text-green-700 space-y-1">
                        <li>• On-time arrival rate improved by 5% this month</li>
                        <li>• Average working hours increased by 0.3 hours per day</li>
                        <li>• Early departures decreased by 2%</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-800">Areas for Improvement</h4>
                      <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                        <li>• Overtime hours increased by 12 hours this month</li>
                        <li>• Consider implementing flexible working hours</li>
                        <li>• Review workload distribution across departments</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom-reports">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Custom Report Generator</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Report Configuration</CardTitle>
                  <CardDescription>Configure and generate custom reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="reportType">Report Type</Label>
                      <Select 
                        value={reportFilters.reportType} 
                        onValueChange={(value) => setReportFilters(prev => ({...prev, reportType: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="attendance">Attendance Report</SelectItem>
                          <SelectItem value="leave">Leave Report</SelectItem>
                          <SelectItem value="productivity">Productivity Report</SelectItem>
                          <SelectItem value="payroll">Payroll Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select 
                        value={reportFilters.department} 
                        onValueChange={(value) => setReportFilters(prev => ({...prev, department: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="eng">Engineering</SelectItem>
                          <SelectItem value="bus">Business</SelectItem>
                          <SelectItem value="arts">Arts & Sciences</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dateRange">Date Range</Label>
                      <Select 
                        value={reportFilters.dateRange} 
                        onValueChange={(value) => setReportFilters(prev => ({...prev, dateRange: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last7days">Last 7 Days</SelectItem>
                          <SelectItem value="last30days">Last 30 Days</SelectItem>
                          <SelectItem value="last3months">Last 3 Months</SelectItem>
                          <SelectItem value="last6months">Last 6 Months</SelectItem>
                          <SelectItem value="lastyear">Last Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={handleGenerateReport}
                      className="bg-green-700 hover:bg-green-800 text-white"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button
                      onClick={() => handleExportReport('Custom')}
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export as PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
