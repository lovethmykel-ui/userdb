'use client';

import React from 'react';
import { Copy } from '@phosphor-icons/react';

interface ReferralsViewProps {
  onShowToast: (msg: string) => void;
}

export const ReferralsView: React.FC<ReferralsViewProps> = ({ onShowToast }) => {
  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`✓ ${label} copied to clipboard`);
  };

  return (
    <section className="view active" id="view-referrals">
      <div className="section-title">
        <span>Affiliates &amp; Referral Program</span>
        <span className="pill pill-brand">30% Lifetime Commission</span>
      </div>

      <div className="dash-grid">
        <div className="card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>Your Direct Referral Link</div>
          <div className="addr-box" style={{ marginTop: '8px' }}>
            <span>oknexus.com/r/tobi-a2091</span>
            <button 
              style={{ color: 'var(--brand)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              onClick={() => copyText('https://oknexus.com/r/tobi-a2091', 'Referral link')}
            >
              <Copy size={14} /> Copy
            </button>
          </div>

          <div style={{ fontSize: '12.5px', color: 'var(--text-dim)', marginTop: '14px' }}>Your Referral Code</div>
          <div className="addr-box" style={{ marginTop: '8px' }}>
            <span className="font-bold text-purple">TOBI2091</span>
            <button 
              style={{ color: 'var(--brand)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              onClick={() => copyText('TOBI2091', 'Referral code')}
            >
              <Copy size={14} /> Copy
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginTop: '20px' }}>
            <div className="stat-card" style={{ padding: 0 }}>
              <div className="l">Referred Traders</div>
              <div className="v font-mono text-white" style={{ fontSize: '16px' }}>14</div>
            </div>
            <div className="stat-card" style={{ padding: 0 }}>
              <div className="l">Total Commission</div>
              <div className="v font-mono text-emerald" style={{ fontSize: '16px' }}>$212.40</div>
            </div>
            <div className="stat-card" style={{ padding: 0 }}>
              <div className="l">Commission Tier</div>
              <div className="v font-mono text-purple" style={{ fontSize: '16px' }}>30%</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '22px' }}>
          <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '12px' }}>
            <span>Recent Commission Settlements</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">From @NairaKing</div>
              <div className="d">Trading fee share (BTC/USDT) · 22 Aug 2026</div>
            </div>
            <span className="mono up font-bold">+$4.20 USDT</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">From @CoinBridge_NG</div>
              <div className="d">Trading fee share (ETH/USDT) · 19 Aug 2026</div>
            </div>
            <span className="mono up font-bold">+$1.85 USDT</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">From @JakartaSwap</div>
              <div className="d">Trading fee share (SOL/USDT) · 14 Aug 2026</div>
            </div>
            <span className="mono up font-bold">+$6.40 USDT</span>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '16px' }}
            onClick={() => onShowToast('✓ Commission balance ($212.40) swept to your Spot Wallet')}
          >
            Claim &amp; Withdraw Earnings ($212.40)
          </button>
        </div>
      </div>
    </section>
  );
};
