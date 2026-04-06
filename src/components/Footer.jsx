import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-1 mb-6">
              Lease<span className="text-primary-500">IT</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              The enterprise-grade marketplace for leasing heavy machinery, electronics, and vehicles safely and transparently.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 w-fit px-3 py-1.5 rounded border border-slate-800">
                <ShieldCheck size={16} className="text-emerald-400" /> Fully Secured Platform
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/assets" className="hover:text-primary-400 transition">Marketplace Catalog</Link></li>
              <li><Link to="/list" className="hover:text-primary-400 transition">List Your Assets</Link></li>
              <li><Link to="/pricing" className="hover:text-primary-400 transition">Pricing & Fees</Link></li>
              <li><Link to="/partners" className="hover:text-primary-400 transition">Verified Partners</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal & Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/help" className="hover:text-primary-400 transition">Help Center & FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-primary-400 transition">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-400 transition">Privacy Policy</Link></li>
              <li><Link to="/insurance" className="hover:text-primary-400 transition">Insurance Information</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition"><Facebook size={18} /></a>
            </div>
            <p className="text-sm font-medium flex items-center gap-2">
                <Mail size={16} /> support@leaseit.io
            </p>
          </div>

        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} LeaseIT. All rights reserved.</p>
          <div className="flex gap-4">
              <span>San Francisco</span>
              <span>•</span>
              <span>London</span>
              <span>•</span>
              <span>Singapore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
