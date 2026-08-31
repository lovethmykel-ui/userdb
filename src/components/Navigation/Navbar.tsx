'use client';

import React from 'react';
import { 
  MagnifyingGlass, 
  Bell, 
  GearSix, 
  ShieldCheck, 
  ArrowDown, 
  ArrowUp, 
  UserCircle,
  Lightning,
  Coins
} from '@phosphor-icons/react';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';

interface NavbarProps {
  activeView: string;
  onSelectView?: (view: string) => void;
  onNavigate?: (view: string) => void;
  onOpenDepositModal: () => void;
  onOpenWithdrawModal: () => void;
  activeAlertCount?: number;
  unreadAlertCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  onNavigate,
  onOpenDepositModal,
  onOpenWithdrawModal,
  activeAlertCount = 0,
  unreadAlertCount = 0
}) => {
  const navigate = (v: string) => {
    if (onSelectView) onSelectView(v);
    else if (onNavigate) onNavigate(v);
  };

  const alertCount = activeAlertCount || unreadAlertCount;

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'markets', label: 'Markets' },
    { id: 'trade', label: 'Trade', badge: 'Pro' },
    { id: 'convert', label: 'Convert' },
    { id: 'buysell', label: 'Buy Crypto' },
    { id: 'p2p', label: 'P2P' },
    { id: 'wallet', label: 'Assets' },
    { id: 'okn', label: 'OTC Desk' },
    { id: 'earn', label: 'Earn' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'explore', label: 'Explore' },
    { id: 'more', label: 'More' },
  ];

  return (
    <>
      {/* Top Utility Ticker Bar */}
      <div className="util-bar">
        <div className="util-left">
          <span className="dot" />
          <span className="util-label font-bold">ALL SYSTEMS OPERATIONAL</span>
          <span style={{ color: 'var(--border)' }}>|</span>
          <span className="util-label flex items-center gap-1">
            <ShieldCheck size={13} className="text-emerald" /> Proof of Reserves: <strong>104.8%</strong>
          </span>
        </div>

        <div className="util-corridors scrollhide">
          <div className="util-ticker">
            <span>USDT/NGN</span>
            <span className="v font-mono text-white">₦1,611.90</span>
            <span className="up font-mono">▲ +0.42%</span>
          </div>
          <div className="util-ticker">
            <span>USDT/KES</span>
            <span className="v font-mono text-white">KSh 129.40</span>
            <span className="up font-mono">▲ +0.18%</span>
          </div>
          <div className="util-ticker">
            <span>USDT/IDR</span>
            <span className="v font-mono text-white">Rp 16,240</span>
            <span className="down font-mono">▼ -0.12%</span>
          </div>
          <div className="util-ticker">
            <span>USDT/PHP</span>
            <span className="v font-mono text-white">₱57.85</span>
            <span className="up font-mono">▲ +0.05%</span>
          </div>
        </div>
      </div>

      {/* Master Navigation Bar */}
      <nav className="nav">
        {/* Left: Logo & Brand */}
        <div className="nav-logo cursor-pointer" onClick={() => navigate('dashboard')}>
          <div className="logo-badge" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', boxShadow: '0 0 14px rgba(139, 92, 246, 0.4)' }}>
            <CryptoIcon sym="OKN" size={24} />
          </div>
          <span className="logo-text">
            OK<span>NEXUS</span>
            <span className="logo-pro-badge">PRO</span>
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div className="nav-links">
          {mainNavItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => navigate(item.id)}
              >
                {item.label}
                {item.badge && (
                  <span className="pill pill-brand" style={{ fontSize: '9px', padding: '1px 5px', marginLeft: '2px' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Actions & User Controls */}
        <div className="nav-right">
          <button 
            className="icon-btn" 
            title="Search Markets"
            onClick={() => navigate('markets')}
          >
            <MagnifyingGlass size={16} />
          </button>

          <button 
            className="icon-btn" 
            title="Price Alerts"
            onClick={() => navigate('alerts')}
            style={{ position: 'relative' }}
          >
            <Bell size={16} />
            {alertCount > 0 && (
              <span className="badge" style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                {alertCount}
              </span>
            )}
          </button>

          <button 
            className="icon-btn" 
            title="Settings"
            onClick={() => navigate('settings')}
          >
            <GearSix size={16} />
          </button>

          <div style={{ display: 'flex', gap: '8px', marginLeft: '6px' }}>
            <button 
              className="btn btn-ghost" 
              style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={onOpenWithdrawModal}
            >
              <ArrowUp size={13} /> Withdraw
            </button>
            <button 
              className="btn btn-primary" 
              style={{ padding: '6px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={onOpenDepositModal}
            >
              <ArrowDown size={13} /> Deposit
            </button>
          </div>

          <div 
            className="avatar-btn cursor-pointer" 
            title="Account & Security"
            onClick={() => navigate('profile')}
            style={{ marginLeft: '6px' }}
          >
            <div className="avatar-disc font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #4C1D95)', border: '1.5px solid var(--brand)' }}>
              JD
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
