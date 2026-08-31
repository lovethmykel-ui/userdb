'use client';

import React from 'react';

interface RewardsViewProps {
  onShowToast: (msg: string) => void;
}

export const RewardsView: React.FC<RewardsViewProps> = ({ onShowToast }) => {
  return (
    <section className="view active" id="view-rewards">
      <div className="section-title">
        <span>Rewards Hub &amp; Quests</span>
        <span className="text-dim text-xs">Airdrops &amp; Task Bonuses</span>
      </div>

      <div className="earn-grid">
        <div className="card earn-card">
          <div style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>Level 2 Welcome Voucher</div>
          <div className="apy font-mono text-emerald">$10.00</div>
          <div className="apy-sub">Claimable for verified Level 2 accounts</div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => onShowToast('✓ Welcome voucher claimed')}>
            Claim $10 Bonus
          </button>
        </div>

        <div className="card earn-card">
          <div style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>Weekly Volume Sprint</div>
          <div className="apy font-mono text-purple">$5.00</div>
          <div className="apy-sub">Trade $100+ notional volume this week</div>
          <button className="btn btn-ghost" style={{ width: '100%' }}>
            In Progress — $64 / $100
          </button>
        </div>

        <div className="card earn-card">
          <div style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>OKN Ecosystem Airdrop (Season 3)</div>
          <div className="apy font-mono text-white">240 OKN</div>
          <div className="apy-sub">Allocated based on 30-day trading frequency</div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => onShowToast('✓ 240 OKN Tokens credited to your Spot Wallet')}>
            Claim 240 OKN
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '18px 20px', marginTop: '16px' }}>
        <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '10px' }}>
          <span>Reward Distribution History</span>
        </div>

        <div className="settings-row">
          <div>
            <div className="t">Affiliate Milestone Bonus</div>
            <div className="d">12 Aug 2026</div>
          </div>
          <span className="mono up font-bold">+$2.00 USDT</span>
        </div>

        <div className="settings-row">
          <div>
            <div className="t">Season 2 Early Supporter Airdrop</div>
            <div className="d">30 Jun 2026</div>
          </div>
          <span className="mono up font-bold">+180 OKN</span>
        </div>
      </div>
    </section>
  );
};
