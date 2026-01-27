
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Loader2, Check, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    
    try {
      const serviceId = (process.env as any).VITE_EMAILJS_SERVICE_ID;
      const templateId = (process.env as any).VITE_NEWSLETTER_TEMPLATE_ID || (process.env as any).VITE_EMAILJS_TEMPLATE_ID;

      if ((window as any).emailjs && serviceId && templateId) {
        await (window as any).emailjs.send(
          serviceId,
          templateId,
          { 
            email_address: email, 
            source: 'Website Footer',
            to_email: 'davidbulus117@gmail.com'
          }
        );
      } else {
        await new Promise(r => setTimeout(r, 1000));
      }
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex flex-col space-y-4 outline-none group">
              <img 
                src="https://i.postimg.cc/tTmGZ5Qf/FOURCi-Watermark-colored.png" 
                alt="FOURCi Logo" 
                className="h-16 w-auto self-start"
              />
              <span className="text-2xl font-bold text-white tracking-tight group-hover:text-green-500 transition-colors">FOURCi</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Empowering communities to lead climate action and environmental preservation in Nigeria's Sahel region.
            </p>
            <nav className="flex space-x-5" aria-label="Social Links">
              <a href="https://web.facebook.com/fourcinigeria/" target="_blank" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="https://x.com/fourcinigeria" target="_blank" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </nav>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-white font-bold mb-8 text-lg">Resources</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-green-500 transition-colors">About our Work</Link></li>
              <li><Link to="/programs" className="hover:text-green-500 transition-colors">Active Programs</Link></li>
              <li><Link to="/resources" className="hover:text-green-500 transition-colors">Impact History</Link></li>
              <li><Link to="/media" className="hover:text-green-500 transition-colors">Public Resources</Link></li>
              <li><Link to="/contact" className="hover:text-green-500 transition-colors">Contact Office</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-8 text-lg">Headquarters</h3>
            <address className="not-italic text-sm space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="leading-relaxed text-gray-400">No. 45 Airport Road,<br />Bulumkutu, Maiduguri,<br />Borno State, Nigeria</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-green-500 shrink-0" />
                <a href="tel:+2348037245510" className="hover:text-white">+234 803 724 5510</a>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-green-500 shrink-0" />
                <a href="mailto:davidbulus117@gmail.com" className="hover:text-white">davidbulus117@gmail.com</a>
              </div>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-8 text-lg">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">Join 850+ climate advocates for monthly field updates and ecological insights.</p>
            {subscribed ? (
              <div className="bg-green-900/20 border border-green-800 p-4 rounded-xl text-green-400 flex items-center space-x-2 animate-fadeIn">
                <Check size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Subscription Confirmed</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none text-white"
                />
                <button 
                  type="submit"
                  disabled={subscribing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-50"
                >
                  {subscribing && <Loader2 size={16} className="animate-spin" />}
                  <span>{subscribing ? 'Processing...' : 'Subscribe'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Concern on Climate Change for the Community Initiative.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-white transition-colors">Privacy & Policy</Link>
            <span className="text-gray-800">|</span>
            <Link to="/admin" className="flex items-center space-x-2 text-gray-700 hover:text-green-500 transition-colors">
              <Lock size={10} />
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
