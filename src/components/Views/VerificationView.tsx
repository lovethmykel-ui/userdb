'use client';

import React from 'react';

interface VerificationViewProps {
  onShowToast: (msg: string) => void;
}

export const VerificationView: React.FC<VerificationViewProps> = ({ onShowToast }) => {
  return (
    <section className="view active" id="view-verification">
      <div className="section-title">
        <span>Identity Verification &amp; Account Limits</span>
        <span className="pill pill-buy">Level 2 Verified</span>
      </div>

      <div className="dash-grid">
        <div className="card" style={{ padding: '22px' }}>
          <div className="kyc-badge">
            ✓ Identity Verified — Level 2 (Enhanced)
          </div>

          <div className="section-title" style={{ fontSize: '14.5px', margin: '18px 0 6px' }}>
            <span>Verification Tiers</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">Level 1 — Email &amp; Phone SMS</div>
              <div className="d">Basic crypto deposit and spot trading access</div>
            </div>
            <span className="pill pill-buy">Completed</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">Level 2 — Government ID + Biometric Selfie</div>
              <div className="d">Higher limits ($100k/day), full fiat on/off-ramp, P2P merchant access</div>
            </div>
            <span className="pill pill-buy">Completed</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">Level 3 — Proof of Address &amp; Source of Wealth</div>
              <div className="d">Unlimited deposits, $1,000,000 daily withdrawal, custom OTC block trading</div>
            </div>
            <button
              className="pill pill-neutral cursor-pointer"
              onClick={() => onShowToast('✓ Level 3 verification documents submitted for review')}
            >
              Start Level 3 →
            </button>
          </div>
        </div>

        <div className="card" style={{ padding: '22px' }}>
          <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '12px' }}>
            <span>Your Effective Limits</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '14px' }}>
            <div className="stat-card" style={{ padding: 0 }}>
              <div className="l">Daily Crypto Withdrawal</div>
              <div className="v font-mono text-emerald" style={{ fontSize: '16px' }}>$100,000.00</div>
            </div>
            <div className="stat-card" style={{ padding: 0 }}>
              <div className="l">Daily Deposit</div>
              <div className="v font-mono text-purple" style={{ fontSize: '16px' }}>Unlimited</div>
            </div>
            <div className="stat-card" style={{ padding: 0 }}>
              <div className="l">P2P Daily Volume Limit</div>
              <div className="v font-mono text-white" style={{ fontSize: '16px' }}>$50,000.00</div>
            </div>
            <div className="stat-card" style={{ padding: 0 }}>
              <div className="l">Fiat Daily Payout</div>
              <div className="v font-mono text-white" style={{ fontSize: '16px' }}>$20,000.00</div>
            </div>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--text-faint)', marginTop: '16px', lineHeight: 1.5 }}>
            Limits reset automatically every 24 hours at 00:00 UTC. Complete Level 3 address verification to unlock maximum institutional quotas.
          </p>
        </div>
      </div>
    </section>
  );
};
