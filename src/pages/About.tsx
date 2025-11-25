
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-light to-neon bg-clip-text text-transparent">
          About Slowed+Reverb
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-6">
            Welcome to slowedandreverbgenerator.com, the premier online tool for creating beautiful slowed and reverb versions of your favorite music.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
          <p className="text-gray-300 mb-6">
            Slowed+Reverb was created out of a passion for the unique, dreamy sound that comes from slowing down music and adding reverb effects. What started as a niche internet trend has grown into a beloved music style, and we wanted to make creating these atmospheric remixes accessible to everyone.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">What is "Slowed + Reverb"?</h2>
          <p className="text-gray-300 mb-6">
            The slowed and reverb effect creates a dreamlike, atmospheric version of a song by reducing its tempo and adding spatial reverb. This technique became popular on platforms like YouTube and SoundCloud, where creators would transform popular songs into more ambient, ethereal versions.
          </p>
          <p className="text-gray-300 mb-6">
            The style is often associated with a feeling of nostalgia, with many listeners describing the experience as "what memories sound like." By slowing the tempo and adding reverb, songs take on a new emotional quality, often revealing subtleties and nuances that might be missed at normal speed.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Technology</h2>
          <p className="text-gray-300 mb-6">
            We've built Slowed+Reverb using advanced audio processing technology to ensure the highest quality output. Our tool offers:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
            <li>Professional-grade audio processing</li>
            <li>Customizable speed and reverb settings</li>
            <li>High-quality equalization tools</li>
            <li>Lossless WAV exports</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Usage Guidelines</h2>
          <p className="text-gray-300 mb-6">
            While we provide the tools to create slowed and reverb versions of songs, we encourage users to respect copyright laws and the work of original artists. These transformed versions are best used for personal enjoyment or with proper attribution and permissions when shared publicly.
          </p>
          
          <p className="text-gray-300 mt-10 mb-6">
            Thank you for using Slowed+Reverb. We hope our tool helps you discover new dimensions in the music you love.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/privacy-policy" className="text-purple-light hover:text-neon transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-purple-light hover:text-neon transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-purple-light hover:text-neon transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
