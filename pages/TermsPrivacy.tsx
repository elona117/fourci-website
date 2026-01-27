
// Fix: Use namespace import for React to ensure JSX intrinsic elements are properly resolved
import * as React from 'react';
import { ShieldCheck, FileText, Lock, Globe } from 'lucide-react';

const TermsPrivacy: React.FC = () => {
  return (
    <div className="bg-white">
      <section className="bg-gray-900 py-16 md:py-24 text-center text-white relative overflow-hidden">
        <div className="shimmer-overlay opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy & Terms</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Commitment to transparency and data protection for our global community of climate advocates.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="space-y-6 animate-reveal">
            <div className="flex items-center space-x-3 text-green-600">
              <Lock size={24} />
              <h2 className="text-2xl font-bold">Privacy Commitment</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              At FOURCi, we value your trust. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This excludes trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
          </div>

          <div className="space-y-6 animate-reveal" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-3 text-blue-600">
              <FileText size={24} />
              <h2 className="text-2xl font-bold">Terms of Use</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>By accessing the FOURCi website, you agree to comply with and be bound by the following terms of use:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The content of this website is for your general information and use only. It is subject to change without notice.</li>
                <li>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</li>
                <li>Your use of this website and any dispute arising out of such use is subject to the laws of the Federal Republic of Nigeria.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-reveal" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-3 text-red-600">
              <ShieldCheck size={24} />
              <h2 className="text-2xl font-bold">Donation Integrity</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              All financial contributions made to FOURCi are utilized strictly for our climate resilience programs, tree planting initiatives, and community education in accordance with our organizational bylaws. We provide annual impact reports to ensure total accountability.
            </p>
          </div>

          <div className="pt-12 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400 italic">Last Updated: October 2023. For specific inquiries, contact us at legal@fourci.org.ng</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPrivacy;
