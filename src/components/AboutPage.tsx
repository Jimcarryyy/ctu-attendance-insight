
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, ArrowLeft, CheckCircle, Shield, BarChart3, Clock, Users, Globe } from "lucide-react";

const AboutPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => onNavigate('home')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Camera className="h-8 w-8 text-green-700" />
              <span className="ml-2 text-2xl font-bold text-gray-900">CampusCog</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About CampusCog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CampusCog is a cutting-edge AI-powered Human Resource Information System (HRIS) 
            designed specifically for Cebu Technological University (CTU) – Main Campus.
          </p>
        </div>

        {/* System Overview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">System Overview</CardTitle>
            <CardDescription className="text-lg">
              Transforming HR processes with artificial intelligence and facial recognition technology
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed">
              CampusCog leverages advanced facial recognition technology to provide a secure, efficient, 
              and contactless method for tracking employee attendance. The system integrates seamlessly 
              with existing HR processes, automating Daily Time Records (DTR), leave management, and 
              payroll integration while offering real-time insights into attendance patterns and workforce analytics.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Designed with CTU's unique needs in mind, CampusCog serves both teaching and non-teaching staff, 
              HR personnel, and administrators with role-based access control and intuitive user interfaces.
            </p>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-700" />
                </div>
                <CardTitle className="text-gray-900">Enhanced Security</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Eliminates time theft and buddy punching
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Biometric verification ensures accurate attendance
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Role-based access control for data security
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">Automated Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Automatic DTR generation for payroll
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Streamlined leave request workflows
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Real-time processing and updates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-700" />
                </div>
                <CardTitle className="text-gray-900">Data-Driven Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Interactive analytics dashboards
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Attendance pattern analysis
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Workforce distribution heatmaps
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">Modern Flexibility</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Cloud-based remote access support
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Responsive design for all devices
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Hybrid work environment ready
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTU Context */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 flex items-center">
              <Users className="w-6 h-6 text-green-700 mr-2" />
              Designed for CTU Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed mb-4">
              CampusCog is specifically tailored for the unique needs of Cebu Technological University's 
              academic environment. The system accommodates the diverse requirements of:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Faculty Members</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Flexible scheduling support</li>
                  <li>• Academic calendar integration</li>
                  <li>• Department-specific analytics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Administrative Staff</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Standard work hour tracking</li>
                  <li>• Leave request workflows</li>
                  <li>• Payroll system integration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">HR Personnel</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Comprehensive workforce management</li>
                  <li>• Advanced reporting capabilities</li>
                  <li>• Policy compliance monitoring</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">IT Administrators</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• System configuration control</li>
                  <li>• Security and audit logging</li>
                  <li>• User role management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Your HR Processes?
          </h2>
          <p className="text-gray-600 mb-6">
            Experience the future of attendance management with CampusCog's AI-powered solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('home')}
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => onNavigate('contact')}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
