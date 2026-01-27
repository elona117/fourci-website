
// Fix: Use namespace import for React to ensure JSX intrinsic elements are properly resolved
import * as React from 'react';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  variant?: 'minimal' | 'full';
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, variant = 'minimal' }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this from FOURCi: ${title}`,
          url: url,
        });
      } catch (err) {
        console.debug("Native share failed or dismissed", err);
      }
    }
  };

  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      {navigator.share && (
        <button 
          onClick={handleNativeShare}
          className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900 active:scale-90"
          title="Share via device"
        >
          <Share2 size={16} />
        </button>
      )}
      <a 
        href={shareLinks.facebook} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 hover:bg-blue-50 hover:text-[#1877F2] rounded-full transition-all text-gray-400 active:scale-90"
        title="Share on Facebook"
      >
        <Facebook size={16} />
      </a>
      <a 
        href={shareLinks.twitter} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 hover:bg-gray-100 hover:text-black rounded-full transition-all text-gray-400 active:scale-90"
        title="Share on X"
      >
        <Twitter size={16} />
      </a>
      <a 
        href={shareLinks.linkedin} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 hover:bg-blue-50 hover:text-[#0A66C2] rounded-full transition-all text-gray-400 active:scale-90"
        title="Share on LinkedIn"
      >
        <Linkedin size={16} />
      </a>
      <a 
        href={shareLinks.whatsapp} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 hover:bg-green-50 hover:text-[#25D366] rounded-full transition-all text-gray-400 active:scale-90"
        title="Share on WhatsApp"
      >
        <MessageCircle size={16} />
      </a>
    </div>
  );
};

export default ShareButtons;
