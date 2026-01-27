import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Handshake, Gift, ArrowRight, CheckCircle2, CreditCard, Loader2 } from 'lucide-react';

const GetInvolved: React.FC = () => {
  const [donateAmount, setDonateAmount] = useState<string>('5000');
  const [isPaying, setIsPaying] = useState(false);

  const handlePaystackPayment = () => {
    // Fix: Use process.env instead of import.meta.env to satisfy TypeScript in this environment
    const publicKey = (process.env as any).VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_f97d8efb99a05a68c74370b8a551c8187026ce12';
    const email = 'davidbulus117@gmail.com'; // Primary contact for transaction receipts
    
    if (!(window as any).PaystackPop) {
      alert("Payment gateway is initializing. Please wait a few seconds and try again.");
      return;
    }

    setIsPaying(true);
    try {
      const handler = (window as any).PaystackPop.setup({
        key: publicKey,
        email: email,
        amount: Math.max(1, parseInt(donateAmount || '0')) * 100, // Ensure valid amount in Kobo
        currency: 'NGN',
        callback: (response: any) => {
          console.log('Payment complete! Reference: ' + response.reference);
          alert('Thank you for your generous donation! Your reference is: ' + response.reference);
          setIsPaying(false);
        },
        onClose: () => {
          setIsPaying(false);
        }
      });
      handler.openIframe();
    } catch (err) {
      console.error("Paystack initialization failed:", err);
      alert("There was an error launching the payment window. Please try again or contact support.");
      setIsPaying(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-blue-900 py-24 text-center text-white relative overflow-hidden">
        <div className="shimmer-overlay opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Support Our Mission</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            Every contribution helps us plant one more tree and educate one more community.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Volunteer */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl group hover:-translate-y-2 transition-all">
              <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center text-green-600 mb-8 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Users size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Volunteer</h2>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">Apply to join our field teams or contribute digitally to our awareness campaigns.</p>
              <ul className="space-y-3 mb-10">
                {["Regional Field Leads", "Eco-Club Educators", "Digital Activists"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-black transition-all">
                <span>Apply Now</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Donation Module */}
            <div className="bg-blue-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden lg:scale-105 z-10">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Gift size={120} /></div>
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                <Heart size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Make a Donation</h2>
              <p className="text-blue-200 mb-8 text-sm">Fuel our reforestation efforts in Borno State with a direct contribution.</p>
              
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-3 gap-2">
                  {['2000', '5000', '10000'].map(amt => (
                    <button 
                      key={amt} 
                      onClick={() => setDonateAmount(amt)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${donateAmount === amt ? 'bg-green-600 border-green-600' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                    >
                      ₦{parseInt(amt).toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">₦</span>
                   <input 
                    type="number" 
                    value={donateAmount}
                    onChange={(e) => setDonateAmount(e.target.value)}
                    placeholder="Other Amount" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                   />
                </div>
              </div>

              <button 
                onClick={handlePaystackPayment}
                disabled={isPaying || !donateAmount}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50"
              >
                {isPaying ? <Loader2 className="animate-spin" /> : <CreditCard size={20} />}
                <span>{isPaying ? "Processing..." : `Donate ₦${parseInt(donateAmount || '0').toLocaleString()}`}</span>
              </button>
              
              <p className="mt-4 text-[10px] text-center text-blue-300 opacity-60">Securely processed via Paystack</p>
            </div>

            {/* Partner */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl group hover:-translate-y-2 transition-all">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Handshake size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Corporate Partner</h2>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">Collaborate with FOURCi to offset carbon or lead environmental CSR initiatives.</p>
              <ul className="space-y-3 mb-10">
                {["Strategic Grants", "Equipment Donations", "Joint Research"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all">
                <span>Contact Partnerships</span>
                <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Partners section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-12">Verified Impact Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 filter grayscale contrast-125">
             <img src="https://i.postimg.cc/tTmGZ5Qf/FOURCi-Watermark-colored.png" alt="Borno State" className="h-12 w-auto" />
             <span className="text-2xl font-black text-gray-400 tracking-tighter uppercase">UNDP Nigeria</span>
             <span className="text-2xl font-black text-gray-400 tracking-tighter uppercase">Sahel Watch</span>
             <span className="text-2xl font-black text-gray-400 tracking-tighter uppercase">Eco Trust</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;