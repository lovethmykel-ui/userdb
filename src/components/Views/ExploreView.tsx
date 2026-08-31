'use client';

import React, { useState } from 'react';
import { 
  ChartLineUp, 
  Robot, 
  Coins, 
  TrendUp, 
  RocketLaunch, 
  Gift, 
  CreditCard, 
  GlobeHemisphereWest, 
  Code, 
  DeviceMobile 
} from '@phosphor-icons/react';

interface ExploreViewProps {
  onShowToast: (msg: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onShowToast }) => {
  const [notified, setNotified] = useState<string[]>([]);

  const handleNotify = (name: string) => {
    if (notified.includes(name)) return;
    setNotified((prev) => [...prev, name]);
    onShowToast(`✓ You will be notified when ${name} goes live`);
  };

  const categories = [
    {
      title: "Trade & Yield Architecture",
      desc: "Institutional liquidity protocols and automated algorithmic execution.",
      items: [
        { icon: <ChartLineUp size={22} className="text-purple" />, name: "Margin & Perpetual 125x", desc: "Trade with up to 125x leverage on top crypto assets with sub-millisecond execution." },
        { icon: <Robot size={22} className="text-emerald" />, name: "AI Trading Agent", desc: "Automated quant agents scanning multi-exchange order books around the clock." },
        { icon: <Coins size={22} className="text-purple" />, name: "Validator Staking Pools", desc: "Earn passive native yield by delegating directly to proof-of-stake validator nodes." },
        { icon: <TrendUp size={22} className="text-emerald" />, name: "Prediction Markets", desc: "Trade outcome shares across real-world macro, crypto, and political events in real-time." },
        { icon: <RocketLaunch size={22} className="text-purple" />, name: "Institutional Launchpad", desc: "Token launchpad with on-chain vesting, KYC verification, and automated market making." },
      ]
    },
    {
      title: "Global Payments & Settlement Rails",
      desc: "Instant borderless transactions across African and Asian gateways.",
      items: [
        { icon: <Gift size={22} className="text-emerald" />, name: "Digital Gift Card Hub", desc: "Buy and redeem global gift cards (Steam, Apple, Amazon, Uber) directly with crypto." },
        { icon: <CreditCard size={22} className="text-purple" />, name: "Crypto Virtual Cards", desc: "Spend crypto balances worldwide via Apple Pay and Google Wallet with zero FX markups." },
        { icon: <GlobeHemisphereWest size={22} className="text-emerald" />, name: "Borderless Corridors", desc: "Send and receive international remittances with instant local bank settlement." },
      ]
    },
    {
      title: "Developer Infrastructure & Mobile",
      desc: "High-throughput APIs and native iOS / Android execution.",
      items: [
        { icon: <Code size={22} className="text-purple" />, name: "Developer API & Webhooks", desc: "REST and WebSocket endpoints with FIX protocol support for algorithmic market makers." },
        { icon: <DeviceMobile size={22} className="text-emerald" />, name: "Pro Mobile App (iOS / Android)", desc: "Native terminal application with TradingView charts and biometric biometric authorization." },
      ]
    }
  ];

  return (
    <section className="view active" id="view-explore">
      <div className="section-title">
        <span>Explore Ecosystem Roadmap</span>
        <span className="text-dim text-xs">Active Protocol &amp; Product Engineering</span>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '-10px', marginBottom: '24px' }}>
        Preview institutional products and consumer rails currently in active engineering deployment across the OKNexus ecosystem.
      </p>

      {categories.map((cat, idx) => (
        <div key={idx} className="explore-cat">
          <h3>{cat.title}</h3>
          <p>{cat.desc}</p>

          <div className="explore-grid">
            {cat.items.map((item, itemIdx) => {
              const isNotified = notified.includes(item.name);
              return (
                <div key={itemIdx} className="card explore-card">
                  <div className="ic">{item.icon}</div>
                  <h4>
                    <span>{item.name}</span>
                    <span className="soon-pill">Coming Soon</span>
                  </h4>
                  <p>{item.desc}</p>
                  <button
                    className={`notify-btn ${isNotified ? 'done' : ''}`}
                    onClick={() => handleNotify(item.name)}
                  >
                    {isNotified ? '✓ Subscribed for Early Access' : 'Request Early Access →'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};
