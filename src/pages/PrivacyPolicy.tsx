
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-light to-neon bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            Last updated: April 16, 2025
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
          <p className="text-gray-300 mb-6">
            This Privacy Policy describes how slowedandreverbgenerator.com ("we," "us," or "our") collects, uses, and discloses your information when you use our website and services.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-300 mb-2">
            <strong>Audio Files:</strong> When you upload audio files to our service, these files are processed in your browser. We do not store your audio files on our servers; all processing happens locally on your device.
          </p>
          <p className="text-gray-300 mb-6">
            <strong>Usage Data:</strong> We may collect anonymous usage data such as browser type, device type, and interaction with our site to improve our service.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">How We Process Your Data</h2>
          <p className="text-gray-300 mb-6">
            Our audio processing tool runs entirely in your web browser using client-side JavaScript. Your audio files are never sent to our servers and remain private on your device. The processed files are also generated in your browser and downloaded directly to your device.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Cookies and Analytics</h2>
          <p className="text-gray-300 mb-6">
            We use cookies and similar technologies to enhance your experience on our site. We may also use third-party analytics services to collect anonymous information about site usage.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Services</h2>
          <p className="text-gray-300 mb-6">
            Our website may include links to third-party websites, plugins, and applications. Clicking on those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-300 mb-6">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-300 mb-6">
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-300 mb-6">
            <a href="mailto:contact@slowedandreverbgenerator.com" className="text-purple-light hover:text-neon">
              contact@slowedandreverbgenerator.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
