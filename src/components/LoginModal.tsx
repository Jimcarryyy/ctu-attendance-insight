
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, User, Lock, X } from "lucide-react";

const LoginModal = ({ onClose, onLogin }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [useFacialRecognition, setUseFacialRecognition] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock users for demonstration
  const mockUsers = {
    'EMP001': { id: 'EMP001', name: 'Juan Dela Cruz', role: 'employee', password: 'password123' },
    'HR001': { id: 'HR001', name: 'Maria Santos', role: 'hr', password: 'hr123' },
    'ADM001': { id: 'ADM001', name: 'Robert Garcia', role: 'admin', password: 'admin123' }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers[employeeId];
    if (!user || user.password !== password) {
      setError('Invalid Employee ID or Password');
      setIsLoading(false);
      return;
    }

    onLogin(user);
    setIsLoading(false);
  };

  const handleFacialRecognition = async () => {
    setError('');
    setIsLoading(true);

    // Simulate facial recognition process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo, randomly select a user
    const users = Object.values(mockUsers);
    const randomUser = users[Math.floor(Math.random() * users.length)];
    
    onLogin(randomUser);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-green-700" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Login to CampusCog</CardTitle>
            <CardDescription className="text-gray-600">
              Access your CTU HRIS account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!useFacialRecognition ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId" className="text-gray-700">Employee ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="employeeId"
                    type="text"
                    placeholder="Enter your Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-gray-600">
                Position your face in the camera frame for facial recognition
              </p>
              {isLoading && (
                <div className="text-blue-600">
                  Analyzing facial features...
                </div>
              )}
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <Button
            onClick={() => {
              if (useFacialRecognition) {
                handleFacialRecognition();
              } else {
                setUseFacialRecognition(true);
              }
            }}
            variant="outline"
            disabled={isLoading}
            className="w-full border-green-600 text-green-700 hover:bg-green-50"
          >
            <Camera className="w-4 h-4 mr-2" />
            {useFacialRecognition ? 'Start Recognition' : 'Use Facial Recognition'}
          </Button>

          {useFacialRecognition && (
            <Button
              onClick={() => setUseFacialRecognition(false)}
              variant="ghost"
              className="w-full text-gray-600 hover:text-gray-800"
            >
              Back to Password Login
            </Button>
          )}

          <div className="text-center space-y-2">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Forgot Password?
            </button>
            <br />
            <button className="text-sm text-gray-600 hover:text-gray-800">
              Contact HR Support
            </button>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
            <strong>Demo Credentials:</strong><br />
            Employee: EMP001 / password123<br />
            HR Staff: HR001 / hr123<br />
            Admin: ADM001 / admin123
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginModal;
