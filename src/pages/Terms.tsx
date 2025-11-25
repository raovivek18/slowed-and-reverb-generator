
import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-light to-neon bg-clip-text text-transparent">
          Terms of Service
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            Last updated: April 16, 2025
          </p>
          
          <p className="text-gray-300 mb-6">
            Please read these Terms of Service ("Terms") carefully before using the Slowed+Reverb Generator website operated by slowedandreverbgenerator.com.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
          <p className="text-gray-300 mb-6">
            By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the website.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use License</h2>
          <p className="text-gray-300 mb-6">
            Our audio processing tool is provided for personal and non-commercial use. The slowed and reverb versions you create using our service should respect copyright laws and the rights of original content creators.
          </p>
          <p className="text-gray-300 mb-6">
            You may not:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
            <li>Use our service to process audio content in violation of copyright laws</li>
            <li>Commercialize modified audio created using our service without proper permissions</li>
            <li>Attempt to decompile or reverse engineer any software contained on our website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer</h2>
          <p className="text-gray-300 mb-6">
            The materials on Slowed+Reverb Generator's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitations</h2>
          <p className="text-gray-300 mb-6">
            In no event shall Slowed+Reverb Generator or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Content Guidelines</h2>
          <p className="text-gray-300 mb-6">
            You are responsible for ensuring that any audio content you process using our service complies with applicable laws and regulations. We encourage users to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
            <li>Only process audio content you have the rights to modify</li>
            <li>Properly attribute original artists when sharing modified content</li>
            <li>Respect the artistic integrity of original works</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">6. Modifications</h2>
          <p className="text-gray-300 mb-6">
            We may revise these Terms at any time without notice. By using this website, you are agreeing to be bound by the current version of these Terms.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">7. Governing Law</h2>
          <p className="text-gray-300 mb-6">
            These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact Us</h2>
          <p className="text-gray-300 mb-6">
            If you have any questions about these Terms, please contact us at:
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

export default Terms;
