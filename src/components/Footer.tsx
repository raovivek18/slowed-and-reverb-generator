
import { Link } from 'react-router-dom';
import AnimatedWaveLogo from './AnimatedWaveLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <AnimatedWaveLogo animated={false} />
            </Link>
            <p className="text-gray-400 text-sm mt-2 bg-gradient-to-r from-[#f0abfc] to-[#9b87f5] text-transparent bg-clip-text">
              Create beautiful slowed and reverb versions of your favorite tracks.
            </p>
          </div>
          
          <nav className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link>
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link>
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link>
          </nav>
        </div>
        
        <div className="border-t border-white/5 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} slowedandreverbgenerator.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
