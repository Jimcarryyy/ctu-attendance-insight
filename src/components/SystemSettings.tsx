
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Camera, Clock, Shield, Bell, Database, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SystemSettings = ({ onBack }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Facial Recognition Settings
    recognitionThreshold: '85',
    cameraQuality: 'high',
    enableAntiSpoofing: true,
    
    // Attendance Settings
    workingHours: {
      start: '08:00',
      end: '17:00'
    },
    lateThreshold: '15',
    autoClockOut: true,
    
    // Security Settings
    sessionTimeout: '30',
    passwordPolicy: 'strong',
    twoFactorAuth: false,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    notificationFrequency: 'daily',
    
    // System Settings
    timeZone: 'Asia/Manila',
    dateFormat: 'MM/DD/YYYY',
    language: 'en'
  });

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully.",
    });
  };

  const updateSetting = (category, key, value) => {
    if (category === 'workingHours') {
      setSettings(prev => ({
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [key]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-green-700" />
              <span className="ml-2 text-2xl font-bold text-gray-900">System Settings</span>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="facial-recognition" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="facial-recognition" className="flex items-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Facial Recognition</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>System</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="facial-recognition">
            <Card>
              <CardHeader>
                <CardTitle>Facial Recognition Configuration</CardTitle>
                <CardDescription>Configure AI-powered facial recognition settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="threshold">Recognition Threshold (%)</Label>
                    <Input
                      id="threshold"
                      type="number"
                      min="70"
                      max="99"
                      value={settings.recognitionThreshold}
                      onChange={(e) => updateSetting(null, 'recognitionThreshold', e.target.value)}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">Higher values increase security but may reduce recognition success</p>
                  </div>
                  <div>
                    <Label htmlFor="cameraQuality">Camera Quality</Label>
                    <Select value={settings.cameraQuality} onValueChange={(value) => updateSetting(null, 'cameraQuality', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (480p)</SelectItem>
                        <SelectItem value="medium">Medium (720p)</SelectItem>
                        <SelectItem value="high">High (1080p)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="antiSpoofing">Anti-Spoofing Protection</Label>
                    <p className="text-sm text-gray-500">Prevents photo/video attacks</p>
                  </div>
                  <Switch
                    id="antiSpoofing"
                    checked={settings.enableAntiSpoofing}
                    onCheckedChange={(checked) => updateSetting(null, 'enableAntiSpoofing', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Configuration</CardTitle>
                <CardDescription>Set working hours and attendance policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="startTime">Work Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={settings.workingHours.start}
                      onChange={(e) => updateSetting('workingHours', 'start', e.target.value)}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">Work End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={settings.workingHours.end}
                      onChange={(e) => updateSetting('workingHours', 'end', e.target.value)}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lateThreshold">Late Threshold (minutes)</Label>
                  <Input
                    id="lateThreshold"
                    type="number"
                    min="1"
                    max="60"
                    value={settings.lateThreshold}
                    onChange={(e) => updateSetting(null, 'lateThreshold', e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoClockOut">Auto Clock-Out</Label>
                    <p className="text-sm text-gray-500">Automatically clock out at end of work day</p>
                  </div>
                  <Switch
                    id="autoClockOut"
                    checked={settings.autoClockOut}
                    onCheckedChange={(checked) => updateSetting(null, 'autoClockOut', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure system security and access policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="480"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting(null, 'sessionTimeout', e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select value={settings.passwordPolicy} onValueChange={(value) => updateSetting(null, 'passwordPolicy', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8 characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, numbers)</SelectItem>
                      <SelectItem value="strong">Strong (8+ chars, mixed case, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    id="twoFactor"
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => updateSetting(null, 'twoFactorAuth', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotif">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotif"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting(null, 'emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotif">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Send notifications via SMS</p>
                  </div>
                  <Switch
                    id="smsNotif"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => updateSetting(null, 'smsNotifications', checked)}
                  />
                </div>
                <div>
                  <Label htmlFor="notifFreq">Notification Frequency</Label>
                  <Select value={settings.notificationFrequency} onValueChange={(value) => updateSetting(null, 'notificationFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>General system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select value={settings.timeZone} onValueChange={(value) => updateSetting(null, 'timeZone', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Manila">Asia/Manila (PHT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={settings.dateFormat} onValueChange={(value) => updateSetting(null, 'dateFormat', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">System Language</Label>
                  <Select value={settings.language} onValueChange={(value) => updateSetting(null, 'language', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fil">Filipino</SelectItem>
                      <SelectItem value="ceb">Cebuano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button
            onClick={handleSaveSettings}
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-2"
          >
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
