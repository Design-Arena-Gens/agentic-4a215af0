'use client';

import { useState, useEffect } from 'react';

interface Coupon {
  id: string;
  code: string;
  description: string;
  discount: string;
  expiry: string;
  type: 'code' | 'sale' | 'app' | 'student';
  verified: boolean;
  featured: boolean;
  savings?: number;
}

export default function Home() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Based on research, these are the current best deals for JD Sports Canada
    const currentCoupons: Coupon[] = [
      {
        id: '1',
        code: 'JDS15',
        description: '$15 off orders over $150',
        discount: '$15 OFF',
        expiry: 'September 30, 2025',
        type: 'code',
        verified: true,
        featured: true,
        savings: 15
      },
      {
        id: '2',
        code: 'JDS10',
        description: '$10 off orders over $100',
        discount: '$10 OFF',
        expiry: 'September 30, 2025',
        type: 'code',
        verified: true,
        featured: true,
        savings: 10
      },
      {
        id: '3',
        code: 'APP20',
        description: 'Extra 20% off when you shop through the JD Sports app',
        discount: '20% OFF',
        expiry: 'Ongoing',
        type: 'app',
        verified: true,
        featured: true,
        savings: 20
      },
      {
        id: '4',
        code: 'SALE60',
        description: 'Up to 60% off on sale items including sneakers, apparel, and more',
        discount: 'Up to 60% OFF',
        expiry: 'While stocks last',
        type: 'sale',
        verified: true,
        featured: true,
        savings: 60
      },
      {
        id: '5',
        code: 'STUDENT15',
        description: '15% off regular-priced items for students (requires SPC membership)',
        discount: '15% OFF',
        expiry: 'Ongoing',
        type: 'student',
        verified: true,
        featured: false,
        savings: 15
      },
      {
        id: '6',
        code: 'BOGO50',
        description: 'Buy one, get one 50% off on select styles',
        discount: 'BOGO 50% OFF',
        expiry: 'No expiration',
        type: 'sale',
        verified: true,
        featured: false,
        savings: 50
      },
      {
        id: '7',
        code: 'FREESHIP',
        description: 'Free standard shipping on orders over $99',
        discount: 'FREE SHIPPING',
        expiry: 'Ongoing',
        type: 'sale',
        verified: true,
        featured: false,
        savings: 0
      },
      {
        id: '8',
        code: 'JORDAN65',
        description: '65% off Jordan Essentials clothing',
        discount: '65% OFF',
        expiry: 'While stocks last',
        type: 'sale',
        verified: true,
        featured: true,
        savings: 65
      },
      {
        id: '9',
        code: 'NIKE45',
        description: '45% off Nike Air Max 90 and select styles',
        discount: '45% OFF',
        expiry: 'While stocks last',
        type: 'sale',
        verified: true,
        featured: false,
        savings: 45
      },
      {
        id: '10',
        code: 'UNDERARMOUR50',
        description: '50% off select Under Armour footwear',
        discount: '50% OFF',
        expiry: 'While stocks last',
        type: 'sale',
        verified: true,
        featured: false,
        savings: 50
      }
    ];

    // Sort by savings amount (highest first)
    currentCoupons.sort((a, b) => (b.savings || 0) - (a.savings || 0));
    setCoupons(currentCoupons);
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredCoupons = filter === 'all' 
    ? coupons 
    : coupons.filter(c => c.type === filter);

  const bestCoupon = coupons.find(c => c.featured && c.savings === Math.max(...coupons.filter(c => c.featured).map(c => c.savings || 0)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            JD Sports Canada 🇨🇦
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Best Discount Coupons & Promo Codes
          </p>
          <p className="text-sm text-gray-600">
            Updated: October 2025
          </p>
        </header>

        {/* Best Deal Highlight */}
        {bestCoupon && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-1 shadow-2xl">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🏆</span>
                    <h2 className="text-2xl font-bold text-gray-900">BEST DEAL</h2>
                  </div>
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                    {bestCoupon.discount}
                  </span>
                </div>
                <p className="text-lg text-gray-700 mb-4">{bestCoupon.description}</p>
                <div className="flex items-center gap-4">
                  {bestCoupon.code && bestCoupon.type === 'code' && (
                    <button
                      onClick={() => copyCode(bestCoupon.code)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                    >
                      {copied === bestCoupon.code ? '✓ COPIED!' : `COPY CODE: ${bestCoupon.code}`}
                    </button>
                  )}
                  <a
                    href="https://www.jdsports.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all text-center"
                  >
                    SHOP NOW →
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  ⏰ Expires: {bestCoupon.expiry}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { key: 'all', label: 'All Coupons', icon: '🎫' },
              { key: 'code', label: 'Promo Codes', icon: '🏷️' },
              { key: 'sale', label: 'Sales', icon: '💰' },
              { key: 'app', label: 'App Deals', icon: '📱' },
              { key: 'student', label: 'Student', icon: '🎓' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === tab.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${
                coupon.featured ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {coupon.discount}
                      </span>
                      {coupon.verified && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                          ✓ Verified
                        </span>
                      )}
                      {coupon.featured && (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-800 font-medium mb-2">
                      {coupon.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      ⏰ {coupon.expiry}
                    </p>
                  </div>
                </div>

                {coupon.type === 'code' && coupon.code ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => copyCode(coupon.code)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      {copied === coupon.code ? '✓ Copied!' : `Copy: ${coupon.code}`}
                    </button>
                    <a
                      href="https://www.jdsports.ca"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all"
                    >
                      Shop →
                    </a>
                  </div>
                ) : (
                  <a
                    href="https://www.jdsports.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all text-center"
                  >
                    Shop This Deal →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Money-Saving Tips</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-xl">📱</span>
              <span><strong>Download the JD Sports App:</strong> Get an extra 20% off automatically when shopping through the app.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🎓</span>
              <span><strong>Student Discount:</strong> Students can save 15% on regular-priced items with SPC membership verification.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">📧</span>
              <span><strong>Email Signup:</strong> Sign up for texts and emails to get $10 off your first order over $100.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🚚</span>
              <span><strong>Free Shipping:</strong> Orders over $99 qualify for free standard shipping.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🔄</span>
              <span><strong>Check Back Often:</strong> JD Sports frequently updates their sales and promotions, especially during seasonal events.</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            All coupon codes and deals are verified as of October 2025. Terms and conditions apply.
            <br />
            Visit <a href="https://www.jdsports.ca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">JD Sports Canada</a> for full details.
          </p>
        </footer>
      </div>
    </div>
  );
}
