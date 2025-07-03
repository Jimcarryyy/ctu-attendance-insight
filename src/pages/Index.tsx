
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Clock, BarChart3, Shield, Users, Calendar } from "lucide-react";
import LoginModal from '@/components/LoginModal';
import EmployeeDashboard from '@/components/EmployeeDashboard';
import HRDashboard from '@/components/HRDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
    // Redirect based on role
    if (userData.role === 'employee') {
      setCurrentPage('employee-dashboard');
    } else if (userData.role === 'hr') {
      setCurrentPage('hr-dashboard');
    } else if (userData.role === 'admin') {
      setCurrentPage('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    toast({
      title: "Navigation",
      description: `Navigated to ${page.charAt(0).toUpperCase() + page.slice(1)} page`,
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'employee-dashboard':
        return <EmployeeDashboard user={user} onLogout={handleLogout} />;
      case 'hr-dashboard':
        return <HRDashboard user={user} onLogout={handleLogout} />;
      case 'admin-dashboard':
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavigation('home')}>
                <Camera className="h-8 w-8 text-green-700" />
                <span className="ml-2 text-2xl font-bold text-gray-900">CampusCog</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => handleNavigation('home')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === 'home' 
                    ? 'text-green-700 border-b-2 border-green-700' 
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('about')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === 'about' 
                    ? 'text-green-700 border-b-2 border-green-700' 
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavigation('contact')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === 'contact' 
                    ? 'text-green-700 border-b-2 border-green-700' 
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                Contact
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowLogin(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Streamlining Attendance with
              <span className="text-green-700 block">AI Precision</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              CampusCog is CTU's modern, AI-powered HRIS system that leverages facial recognition 
              technology for secure, efficient, and contactless employee attendance tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button
                  onClick={() => {
                    if (user.role === 'employee') setCurrentPage('employee-dashboard');
                    else if (user.role === 'hr') setCurrentPage('hr-dashboard');
                    else setCurrentPage('admin-dashboard');
                  }}
                  className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 text-lg"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => setShowLogin(true)}
                    className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 text-lg"
                  >
                    <Clock className="w-5 h-5 mr-2" />
                    Clock In/Out
                  </Button>
                  <Button
                    onClick={() => handleNavigation('about')}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-3 text-lg"
                  >
                    Learn More
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how CampusCog transforms HR processes with cutting-edge AI technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card 
              className="bg-white border-gray-200 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
              onClick={() => {
                toast({
                  title: "Facial Recognition",
                  description: "Secure biometric verification eliminates time theft and buddy punching",
                });
              }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-green-700" />
                </div>
                <CardTitle className="text-gray-900">Facial Recognition</CardTitle>
                <CardDescription className="text-gray-600">
                  Secure biometric verification eliminates time theft and buddy punching
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="bg-white border-gray-200 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
              onClick={() => {
                toast({
                  title: "Analytics Dashboard",
                  description: "Real-time insights into attendance patterns and workforce analytics",
                });
              }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">Analytics Dashboard</CardTitle>
                <CardDescription className="text-gray-600">
                  Real-time insights into attendance patterns and workforce analytics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="bg-white border-gray-200 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
              onClick={() => {
                toast({
                  title: "Automated DTR",
                  description: "Automatic Daily Time Record generation for seamless payroll integration",
                });
              }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-green-700" />
                </div>
                <CardTitle className="text-gray-900">Automated DTR</CardTitle>
                <CardDescription className="text-gray-600">
                  Automatic Daily Time Record generation for seamless payroll integration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="bg-white border-gray-200 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
              onClick={() => {
                toast({
                  title: "Leave Management",
                  description: "Streamlined leave requests with automated approval workflows",
                });
              }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">Leave Management</CardTitle>
                <CardDescription className="text-gray-600">
                  Streamlined leave requests with automated approval workflows
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="bg-white border-gray-200 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
              onClick={() => {
                toast({
                  title: "Role-Based Access",
                  description: "Secure access control tailored for employees, HR staff, and administrators",
                });
              }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-700" />
                </div>
                <CardTitle className="text-gray-900">Role-Based Access</CardTitle>
                <CardDescription className="text-gray-600">
                  Secure access control tailored for employees, HR staff, and administrators
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="bg-white border-gray-200 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
              onClick={() => {
                toast({
                  title: "Cloud-Based",
                  description: "Remote access support for hybrid work environments and real-time processing",
                });
              }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">Cloud-Based</CardTitle>
                <CardDescription className="text-gray-600">
                  Remote access support for hybrid work environments and real-time processing
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* CTU Branding Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Designed for Cebu Technological University
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            CampusCog is specifically tailored for CTU's teaching and non-teaching staff, 
            providing a comprehensive solution that meets the unique needs of our academic community.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4 cursor-pointer" onClick={() => handleNavigation('home')}>
                <Camera className="h-8 w-8 text-green-400" />
                <span className="ml-2 text-xl font-bold">CampusCog</span>
              </div>
              <p className="text-gray-300">
                AI-powered HRIS system for Cebu Technological University
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation('home')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('about')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('contact')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="text-gray-300 space-y-1">
                <p>Cebu Technological University</p>
                <p>Main Campus</p>
                <button
                  onClick={() => {
                    toast({
                      title: "Contact Information",
                      description: "HR Email: hr@ctu.edu.ph",
                    });
                  }}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  hr@ctu.edu.ph
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2025 CampusCog - Cebu Technological University. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );

  return renderPage();
};

export default Index;
