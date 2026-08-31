'use client';

import React from 'react';
import { 
  Users, 
  Gift, 
  ShieldCheck, 
  CreditCard, 
  Headset, 
  Key, 
  Ticket, 
  Receipt, 
  Bank 
} from '@phosphor-icons/react';

interface MoreViewProps {
  onNavigate: (view: string) => void;
}

export const MoreView: React.FC<MoreViewProps> = ({ onNavigate }) => {
  const moreItems = [
    { id: 'referrals', icon: <Users size={22} className="text-purple" />, title: 'Affiliates & Referrals', desc: 'Share your referral link and earn a 30% lifetime share of your friends\' trading fees.', status: 'Active' },
    { id: 'rewards', icon: <Gift size={22} className="text-emerald" />, title: 'Rewards Hub', desc: 'Welcome bonuses, trading task volume quests, and Season 3 OKN token airdrop.', status: 'Active' },
    { id: 'verification', icon: <ShieldCheck size={22} className="text-purple" />, title: 'Verification & Limits', desc: 'Check your KYC level and unlock up to $100,000 daily withdrawal and P2P limits.', status: 'Active' },
    { id: 'payment-methods', icon: <CreditCard size={22} className="text-emerald" />, title: 'Payment Methods', desc: 'Manage saved bank accounts, debit cards, and mobile money for fiat on/off-ramps.', status: 'Active' },
    { id: 'support', icon: <Headset size={22} className="text-purple" />, title: 'Help Center & Support', desc: 'Browse FAQs, resolution workflows, or submit a direct ticket to our support team.', status: 'Active' },
    { id: 'profile', icon: <Key size={22} className="text-emerald" />, title: 'API Key Management', desc: 'Create and configure high-frequency API keys for algorithmic trading bots.', status: 'Active' },
    { id: 'giftcards', icon: <Ticket size={22} className="text-purple" />, title: 'Crypto Gift Cards', desc: 'Buy and redeem digital gift cards for Steam, Apple, Amazon, and Uber with crypto.', status: 'Coming soon' },
    { id: 'bills', icon: <Receipt size={22} className="text-emerald" />, title: 'Bills & Airtime Payout', desc: 'Pay for electricity, broadband, airtime, and utility invoices directly with USDT.', status: 'Coming soon' },
    { id: 'institutional', icon: <Bank size={22} className="text-purple" />, title: 'Institutional Prime Services', desc: 'Sub-millisecond colocation, tri-party custody, and custom credit lines for funds.', status: 'Coming soon' },
  ];

  return (
    <section className="view active" id="view-more">
      <div className="section-title">
        <span>OKNexus Ecosystem &amp; Services</span>
        <span className="text-dim text-xs">All Infrastructure &amp; Tooling</span>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '-10px', marginBottom: '24px' }}>
        Access rewards, referral earnings, compliance verification, payment configurations, and institutional API endpoints.
      </p>

      <div className="explore-grid">
        {moreItems.map((item) => (
          <div
            key={item.id}
            className="card explore-card cursor-pointer"
            onClick={() => {
              if (item.status === 'Active') {
                onNavigate(item.id);
              }
            }}
          >
            <div className="ic">{item.icon}</div>
            <h4>
              <span>{item.title}</span>
              <span className={`pill ${item.status === 'Active' ? 'pill-buy' : 'pill-neutral'}`} style={{ fontSize: '10px' }}>
                {item.status}
              </span>
            </h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
