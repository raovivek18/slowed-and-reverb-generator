
import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
  Send,
  ArchiveX
} from 'lucide-react';

interface SocialShareProps {
  title?: string;
  message?: string;
  url?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  title = "Like this AI tool? Spread the word!",
  message = "Check out this awesome Slowed + Reverb Generator!",
  url = window.location.href
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const encodedMessage = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-6 w-6 text-white" />,
      bgColor: "bg-green-500",
      link: `https://api.whatsapp.com/send?text=${encodedMessage}%20${encodedUrl}`
    },
    {
      name: "Telegram",
      icon: <Send className="h-6 w-6 text-white" />,
      bgColor: "bg-[#0088cc]",
      link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`
    },
    {
      name: "X",
      icon: <Twitter className="h-6 w-6 text-white" />,
      bgColor: "bg-black",
      link: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`
    },
    {
      name: "Reddit",
      icon: <ArchiveX className="h-6 w-6 text-white" />,
      bgColor: "bg-orange-600",
      link: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedMessage}`
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-6 w-6 text-white" />,
      bgColor: "bg-[#1877f2]",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-6 w-6 text-white" />,
      bgColor: "bg-[#0077b5]",
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    }
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)} 
        className="inline-flex items-center gap-2 bg-purple-light hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        Share this tool
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setIsOpen(false)}>
      <div 
        className="bg-[#e6e1f9] rounded-lg p-6 max-w-md w-full shadow-lg" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-800 font-medium text-lg">{title}</h3>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          {shareLinks.map((platform) => (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className={`${platform.bgColor} rounded-full p-3 hover:opacity-90 transition-opacity`}>
                {platform.icon}
              </div>
              <span className="text-gray-700 text-sm">{platform.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
