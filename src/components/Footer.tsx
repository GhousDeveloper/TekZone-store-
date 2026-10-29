import React, { useState } from 'react';
import { TekZoneLogo, PageView } from './Header';
import { Check, ArrowRight, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView, options?: { category?: string; filter?: string; accountTab?: string }) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="mt-10">
      {/* SERVICE FEATURES BAR */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200/90 px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          <div className="flex items-center gap-4 pt-2 sm:pt-0 first:pt-0">
            <div className="w-11 h-11 rounded-full bg-slate-100 text-[#0F172A] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Free Shipping</h4>
              <p className="text-xs text-slate-500">On orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-6">
            <div className="w-11 h-11 rounded-full bg-slate-100 text-[#0F172A] flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Easy Returns</h4>
              <p className="text-xs text-slate-500">Within 30 days</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:pl-6">
            <div className="w-11 h-11 rounded-full bg-slate-100 text-[#0F172A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Secure Payment</h4>
              <p className="text-xs text-slate-500">100% secure checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 lg:pt-0 sm:pl-6">
            <div className="w-11 h-11 rounded-full bg-slate-100 text-[#0F172A] flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">24/7 Support</h4>
              <p className="text-xs text-slate-500">We're here to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN DARK NAVY FOOTER */}
      <div className="bg-[#0B1120] text-slate-300 pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
            {/* Brand Column */}
            <div className="lg:col-span-3 space-y-4">
              <TekZoneLogo dark onClick={() => onNavigate('home')} />
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Your one-stop destination for the latest electronics, fashion, home essentials and more. Shop smarter, live better.
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                {[
                  { name: 'Facebook', label: 'f' },
                  { name: 'Instagram', label: 'ig' },
                  { name: 'YouTube', label: '▶' },
                  { name: 'X', label: '𝕏' },
                  { name: 'TikTok', label: '♪' }
                ].map((soc) => (
                  <button
                    key={soc.name}
                    type="button"
                    onClick={() => onNavigate('shop')}
                    aria-label={soc.name}
                    className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-[#E11D48] text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {soc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-2.5">
              <h4 className="text-sm font-bold text-white">Quick Links</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button type="button" onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                    About Us
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('account', { accountTab: 'support' })} className="hover:text-white transition-colors cursor-pointer">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('account', { accountTab: 'support' })} className="hover:text-white transition-colors cursor-pointer">
                    Help Center
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('account', { accountTab: 'settings' })} className="hover:text-white transition-colors cursor-pointer">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('account', { accountTab: 'settings' })} className="hover:text-white transition-colors cursor-pointer">
                    Terms & Conditions
                  </button>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="lg:col-span-2 space-y-2.5">
              <h4 className="text-sm font-bold text-white">Categories</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button type="button" onClick={() => onNavigate('shop', { category: 'electronics' })} className="hover:text-white transition-colors cursor-pointer">
                    Electronics
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('shop', { category: 'fashion' })} className="hover:text-white transition-colors cursor-pointer">
                    Fashion
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('shop', { category: 'home-living' })} className="hover:text-white transition-colors cursor-pointer">
                    Home & Living
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('shop', { category: 'beauty' })} className="hover:text-white transition-colors cursor-pointer">
                    Beauty
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('shop', { category: 'sports' })} className="hover:text-white transition-colors cursor-pointer">
                    Sports
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('shop', { category: 'gaming' })} className="hover:text-white transition-colors cursor-pointer">
                    Gaming
                  </button>
                </li>
              </ul>
            </div>

            {/* Customer Support */}
            <div className="lg:col-span-2 space-y-2.5">
              <h4 className="text-sm font-bold text-white">Customer Support</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button type="button" onClick={() => onNavigate('account', { accountTab: 'support' })} className="hover:text-white transition-colors cursor-pointer">
                    FAQ
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('tracking')} className="hover:text-white transition-colors cursor-pointer">
                    Shipping Policy
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('account', { accountTab: 'orders' })} className="hover:text-white transition-colors cursor-pointer">
                    Return Policy
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('tracking')} className="hover:text-white transition-colors cursor-pointer">
                    Track Order
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('account', { accountTab: 'support' })} className="hover:text-white transition-colors cursor-pointer">
                    Support Ticket
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('seller')} className="hover:text-white transition-colors cursor-pointer">
                    Become a Seller
                  </button>
                </li>
              </ul>
            </div>

            {/* Subscribe to Our Newsletter */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-sm font-bold text-white">Subscribe to Our Newsletter</h4>
              <p className="text-xs text-slate-400">
                Get the latest updates, offers and more.
              </p>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 h-9 px-3 rounded-md bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#E11D48]"
                />
                <button
                  type="submit"
                  className="h-9 px-4 rounded-md bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  {subscribed ? (
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Joined
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>

              {/* Payment Method Badges */}
              <div className="pt-3 flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded bg-white text-[#1A1F71] text-[10px] font-extrabold tracking-wider">
                  VISA
                </span>
                <span className="px-2.5 py-1 rounded bg-white text-[#EB001B] text-[10px] font-extrabold">
                  MasterCard
                </span>
                <span className="px-2.5 py-1 rounded bg-white text-[#003087] text-[10px] font-extrabold">
                  PayPal
                </span>
                <span className="px-2.5 py-1 rounded bg-white text-emerald-700 text-[10px] font-extrabold">
                  COD
                </span>
                <span className="px-2.5 py-1 rounded bg-white text-slate-900 text-[10px] font-extrabold">
                  Apple Pay
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 TekZone. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('seller')}
                className="hover:text-slate-300 transition-colors cursor-pointer flex items-center gap-1"
              >
                Seller Portal <ArrowRight className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('admin')}
                className="hover:text-slate-300 transition-colors cursor-pointer flex items-center gap-1"
              >
                Admin Console <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
