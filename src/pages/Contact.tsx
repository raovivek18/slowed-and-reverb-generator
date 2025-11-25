
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = new FormData();
    form.append("access_key", "801aaf75-30fb-4a5f-aefe-51366ce15531");
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("message", formData.message);
    form.append("from_name", "Slowed and Reverb Generator");
    form.append("recipient", "contactvivekrao@gmail.com");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form
      });

      const data = await response.json();

      if (data.success) {
        toast("Message sent successfully! We'll get back to you as soon as possible.");
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error("Failed to send message. Please try again.");
        console.error("Form submission error:", data);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-light to-neon bg-clip-text text-transparent">
          Contact Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-300 mb-6">
              We'd love to hear from you! Whether you have questions about our service, feedback on your experience, or ideas for improvement, please don't hesitate to reach out.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-light" />
                <a href="mailto:contact@slowedandreverbgenerator.com" className="text-gray-300 hover:text-white">
                  contact@slowedandreverbgenerator.com
                </a>
              </div>
            </div>
            
            <Card className="bg-secondary border-white/10 p-6">
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-light" />
                Quick Support
              </h3>
              <p className="text-gray-300 mb-4">
                For faster responses to common questions, check out our FAQ sections:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Audio file format compatibility</li>
                <li>Download issues</li>
                <li>Audio quality optimization</li>
                <li>Browser compatibility</li>
              </ul>
            </Card>
          </div>
          
          <div>
            <Card className="bg-secondary border-white/10 p-6">
              <h2 className="text-xl font-medium mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-white/10 focus:border-purple-light"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-white/10 focus:border-purple-light"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-white/10 focus:border-purple-light"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-gray-800 border-white/10 focus:border-purple-light"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-purple hover:opacity-90"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

