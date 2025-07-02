
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Camera, ArrowLeft, Mail, Phone, MapPin, Send, HelpCircle } from "lucide-react";

const ContactPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    // Show success message (in a real app)
    alert('Thank you for your feedback! We will get back to you soon.');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const faqs = [
    {
      question: "How does facial recognition work in CampusCog?",
      answer: "CampusCog uses advanced AI algorithms to analyze unique facial features and create a secure biometric template. When you clock in or out, the system compares your live image with your stored template to verify your identity. The process is contactless, secure, and takes just seconds to complete."
    },
    {
      question: "Is my facial data secure and private?",
      answer: "Absolutely. CampusCog follows strict data protection protocols. Your facial data is encrypted and stored securely in our cloud infrastructure. We comply with all relevant privacy regulations and never share your biometric data with third parties. The system only uses your data for attendance verification purposes."
    },
    {
      question: "What if the facial recognition doesn't work for me?",
      answer: "If you experience issues with facial recognition, please contact HR support immediately. We can troubleshoot common issues like lighting conditions, camera positioning, or update your biometric template. Alternative authentication methods may be available as backup options."
    },
    {
      question: "Can I access CampusCog from my mobile device?",
      answer: "Yes! CampusCog is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. You can clock in/out, view your attendance records, and submit leave requests from any device with a camera and internet connection."
    },
    {
      question: "How do I submit a leave request?",
      answer: "Log in to your employee dashboard, go to the 'Leave Requests' tab, and fill out the leave request form. Select your leave type, specify dates, and provide a reason. Your request will be automatically routed to the appropriate supervisor for approval."
    },
    {
      question: "Who can I contact for technical support?",
      answer: "For technical issues, contact the CTU IT Support team or HR department. You can also use the feedback form on this page to report bugs or request assistance. Our support team typically responds within 24 hours during business days."
    },
    {
      question: "How do I reset my password?",
      answer: "If you've forgotten your password, click the 'Forgot Password' link on the login page or contact HR support directly. For security reasons, password resets must be verified through your official CTU email address or in person with HR."
    },
    {
      question: "Can I download my attendance records?",
      answer: "Yes, employees can export their Daily Time Records (DTR) from their dashboard. The system generates PDF reports that include all your attendance data for specified date ranges, which can be used for personal records or official purposes."
    }
  ];

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Contact & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get help with CampusCog or reach out to our support team for assistance with your HRIS needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Contact Information</CardTitle>
                <CardDescription>
                  Reach out to the CTU HR department for CampusCog support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Support</h3>
                    <p className="text-gray-600">hr@ctu.edu.ph</p>
                    <p className="text-gray-600">campuscog.support@ctu.edu.ph</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Response time: Within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone Support</h3>
                    <p className="text-gray-600">(032) 261-2000 ext. 123</p>
                    <p className="text-gray-600">HR Hotline: (032) 261-2001</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Monday - Friday, 8:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Location</h3>
                    <p className="text-gray-600">
                      Human Resources Department<br />
                      Cebu Technological University<br />
                      Main Campus<br />
                      Corner M.J. Cuenco Ave & R. Palma St.<br />
                      Cebu City, Philippines 6000
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-900">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lunch Break</span>
                    <span className="font-medium text-gray-900">12:00 PM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekend</span>
                    <span className="font-medium text-gray-900">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Form */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Send Feedback</CardTitle>
                <CardDescription>
                  Report issues, request features, or ask questions about CampusCog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@ctu.edu.ph"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide detailed information about your issue, question, or feedback..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about CampusCog
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 text-green-700 mr-2" />
                Common Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-green-700">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="mt-8 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Emergency IT Support</h3>
                <p className="text-red-800">
                  For urgent technical issues affecting attendance or system access during critical periods:
                </p>
                <p className="text-red-900 font-medium mt-1">
                  Emergency Hotline: (032) 261-2000 ext. 911
                </p>
                <p className="text-sm text-red-700 mt-1">
                  Available 24/7 for critical system failures
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
